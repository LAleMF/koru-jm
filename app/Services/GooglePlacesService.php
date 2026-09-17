<?php

class GooglePlacesService
{
    private string $apiKey;
    private string $placeId;

    private string $cacheFile;
    private int $cacheDuration = 3600; // 1 hora

    public function __construct()
    {
        $google = require __DIR__ . '/../../config/google.php';

        $this->apiKey = $google['api_key'];
        $this->placeId = $google['place_id'];

        // Archivo donde guardaremos la respuesta de Google.
        $this->cacheFile = __DIR__ . '/../../storage/cache/google-place.json';
    }

    public function obtenerDatos(): ?array
    {
        // 1. Intentamos obtener los datos desde el caché.
        $datosCache = $this->obtenerCache();

        if ($datosCache !== null) {
            return $datosCache;
        }

        // 2. Si no hay caché válido, consultamos Google.
        $datosGoogle = $this->consultarGoogle();

        if ($datosGoogle !== null) {
            // 3. Guardamos la nueva respuesta.
            $this->guardarCache($datosGoogle);

            return $datosGoogle;
        }

        // 4. Si Google falla, intentamos utilizar el caché antiguo.
        return $this->obtenerCache(true);
    }

    private function consultarGoogle(): ?array
    {
        $url = 'https://places.googleapis.com/v1/places/' . $this->placeId;

        $headers = [
            'Content-Type: application/json',
            'X-Goog-Api-Key: ' . $this->apiKey,
            'X-Goog-FieldMask: id,displayName,formattedAddress,rating,userRatingCount,reviews,googleMapsUri',
        ];

        $ch = curl_init($url);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 10,
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            curl_close($ch);
            return null;
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);

        if ($httpCode !== 200) {
            return null;
        }

        $data = json_decode($response, true);

        if (!is_array($data)) {
            return null;
        }

        return $data;
    }

    private function obtenerCache(bool $ignorarCaducidad = false): ?array
    {
        if (!file_exists($this->cacheFile)) {
            return null;
        }

        $contenido = file_get_contents($this->cacheFile);

        if ($contenido === false) {
            return null;
        }

        $cache = json_decode($contenido, true);

        if (!is_array($cache) || !isset($cache['timestamp'], $cache['data'])) {
            return null;
        }

        // Si el caché está caducado y no estamos ignorando la caducidad.
        if (
            !$ignorarCaducidad &&
            (time() - $cache['timestamp']) >= $this->cacheDuration
        ) {
            return null;
        }

        return $cache['data'];
    }

    private function guardarCache(array $datos): void
    {
        $directorio = dirname($this->cacheFile);

        // Creamos storage/cache si todavía no existe.
        if (!is_dir($directorio)) {
            mkdir($directorio, 0755, true);
        }

        $cache = [
            'timestamp' => time(),
            'data' => $datos,
        ];

        file_put_contents(
            $this->cacheFile,
            json_encode(
                $cache,
                JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE
            )
        );
    }
}
