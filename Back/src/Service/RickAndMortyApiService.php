<?php 
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;
use App\Model\RickAndMortyModel;

/**
 * @return  RickAndmartyModel []
 */

class RickAndMortyApiService {
    private $client;
    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }
    public function loadApi(){

        $data = [];
        $response = $this->client->request(
            'GET',
            'https://rickandmortyapi.com/api/character'
        );
        $statusCode = $response->getStatusCode();
        // $statusCode = 200
        $contentType = $response->getHeaders()['content-type'][0];
        // $contentType = 'application/json'
        $content = $response->getContent();
        // $content = '{"id":521583, "name":"symfony-docs", ...}'
        $content = $response->toArray();
        // $content = ['id' => 521583, 'name' => 'symfony-docs', ...]
       // dump($data);die;

       foreach($content["results"] as $result){
            $model = new RickAndMortyModel($result['name'], $result['image']);
            array_push($data, $model);
       }
      //  dd($data);
        return $data;
    }
    
    // public function test(){
    //     return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque nisi vel tincidunt elementum. Nulla et massa tellus. Aenean aliquam neque eros, eget venenatis lectus sodales in.";
    // }

}


