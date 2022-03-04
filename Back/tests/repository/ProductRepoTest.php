<?php
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProductRepositoryTest extends KernelTestCase
 {
    public function testCount(){
        self::bootKernel();
        $container = static::getContainer();
        $products =  $container->get(ProductRepository::class)->count([]);
        $this->assertEquals(20, $products);

    }
    
}