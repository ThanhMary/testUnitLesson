<?php 
namespace App\Tests;

use PHPUnit\Framework\Assert;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\BrowserKit\AbstractBrowser;

trait CartAssertionsTrait
{
    // test le panier est vide
    public static function assertCartIsEmpty(Crawler $crawler)
        {
            $infoText = $crawler
                ->filter('.alert-info')
                ->getNode(0)
                ->textContent;

            $infoText = self::normalizeWhitespace($infoText);

            Assert::assertEquals(
            'Your cart is empty. Go to the product list.',
                $infoText,
                "The cart should be empty."
        );


        }
    private static function normalizeWhitespace(string $value): string
        {
            return trim(preg_replace('/(?:\s{2,}+|[^\S ])/', ' ', $value));
        }

        private function getRandomProduct(AbstractBrowser $client): array
        {
            $crawler = $client->request('GET', '/');
            $productNode = $crawler->filter('.card')->eq(rand(0, 9));
            $productName = $productNode->filter('.card-title')->getNode(0)->textContent;
            $productPrice = (float)$productNode->filter('span.h5')->getNode(0)->textContent;
            $productLink = $productNode->filter('.btn-dark')->link();
    
            return [
                'name' => $productName,
                'price' => $productPrice,
                'url' => $productLink->getUri()
            ];
        }
        // test le quantité de produit
        public static function assertCartContainsProductWithQuantity(Crawler $crawler, string $productName, int $expectedQuantity): void
        {
            $actualQuantity = (int)self::getItemByProductName($crawler, $productName)
                ->filter('input[type="number"]')
                ->attr('value');
        
            Assert::assertEquals($expectedQuantity, $actualQuantity);
        }
        
        private function addRandomProductToCart(AbstractBrowser $client, int $quantity = 1): array
            {
                $product = $this->getRandomProduct($client);

                $crawler = $client->request('GET', $product['url']);
                $form = $crawler->filter('form')->form();
                $form->setValues(['add_to_cart[quantity]' => $quantity]);

                $client->submit($form);

                return $product;
            }
}
