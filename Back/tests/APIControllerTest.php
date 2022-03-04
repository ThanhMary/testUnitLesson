<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class APIControllerTest extends WebTestCase
{
  
    public function testGetAllProductsApi(): void
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
       $this->assertResponseIsSuccessful();
       $responseData = json_decode($response->getContent(), true);
       $this->assertEquals(['message' => "Hello world"] , $responseData);

    
    }
    public function testGetDefaultController(): void
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/');
        $response = $client->getResponse();
       $this->assertResponseIsSuccessful();
       $responseData = json_decode($response->getContent(), true);
       $this->assertEquals(['message' => "Hello"], $responseData);

    
    }



    public function testGetOneProduct(): void
    {
        $product = [
            "id" => 16,
            "name" => "Amish Cyborg",
            "image" => "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
            "price" => "8",
            "quantity" => 70
        ];
      
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products/16');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $responseData = json_decode($response->getContent(), true);
      //  dd($responseData);
        $this->assertEquals($product, $responseData);
    }


    public function testSizeOfTableProduct(): void
    {
        $client = static::createClient();
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
       $this->assertResponseIsSuccessful($response, 200);
       $responseData = json_decode($response->getContent(), true);
     //  dd(count($responseData));
        $this->assertEquals(count($responseData),20);

    }


   public function testAddProductToCart(){
   $product = [
            "id" => 16,
            "name" => "Amish Cyborg",
            "image" => "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
            "price" => "8",
            "quantity" => 70
        ];
        $client = static::createClient();
        $client->jsonRequest('POST', '/api/cart/16', [
                'quantity' => '2',
            ]);
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        //dump($responseData["products"]);die;
        $this->assertEquals($product, $responseData["products"][0]);
   }

   public function testMessageError(){
    $product = [
             "id" => 3,
             "name" => "Summer Smith",
             "image" => "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
             "price" => "8",
             "quantity" => 0
         ];
         $client = static::createClient();
         $client->jsonRequest('POST', '/api/cart/3', [
                 'quantity' => '2',
             ]);
         $response = $client->getResponse();
         $this->assertResponseIsSuccessful();
         $this->assertJson($response->getContent());
         $responseData = json_decode($response->getContent(), true);
         //dump($responseData["products"]);die;
         $this->assertEquals(["error" => "too many"], $responseData);
    }
   
    public function testDeleteProductFromCart(){
     
             $client = static::createClient();
             $client->jsonRequest('DELETE', '/api/cart/16');
             $response = $client->getResponse();
             $this->assertResponseIsSuccessful();
             $this->assertJson($response->getContent());
             $responseData = json_decode($response->getContent(), true);
            // dd($responseData);
             $this->assertEquals([], $responseData["products"]);
        }

     

        public function testFindCart(){
     
            $client = static::createClient();
            $client->jsonRequest('GET', '/api/cart');
            $response = $client->getResponse();
            $this->assertResponseIsSuccessful();
            $this->assertJson($response->getContent());
            $responseData = json_decode($response->getContent(), true);
           // dd($responseData);
            $this->assertEquals([], $responseData["products"]);
       }

 


}
