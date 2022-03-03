<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Service\RickAndMortyApiService;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;



class AppFixtures extends Fixture
{
    private RickAndMortyApiService $rickAndMortyService;
    private $prices = ["8", "9,99", "15", "16.50", "20"];
    private $quantites = [0, 2,5,20,30,70];
    public function __construct(RickAndMortyApiService $rickAndMortyService)
    {
        $this->rickAndMortyService = $rickAndMortyService;
    }
    public function load(ObjectManager $manager): void
    {
        $data = $this->rickAndMortyService->loadApi();
        foreach ($data as $model){
            $product = new Product();
            $product->setName($model->getName());
            $product->setPrice($this->prices[array_rand($this->prices, 1)]);
            $product->setQuantity($this->quantites[array_rand($this->quantites, 1)]);
            $product->setImage($model->getImage());
            $manager->persist($product);
        }
      
        $manager->flush();
    }
}