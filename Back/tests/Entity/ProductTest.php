<?php
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class ProductEntityTest extends KernelTestCase
 {
    /**
     * @var \Doctrine\ORM\EntityManager
     */
    private $entityManager;

    protected function setUp(): void
    {
        $kernel = self::bootKernel();

        $this->entityManager = $kernel->getContainer()
            ->get('doctrine')
            ->getManager();
    }

    public function testGetPrice()
    {
        $product = $this->entityManager
            ->getRepository(Product::class)
            ->findOneBy(['name' => 'Morty Smith'])
        ;

        $this->assertSame("9,99", $product->getPrice());
    }

    
}