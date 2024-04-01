describe('Shopping Cart', () => {
    beforeEach(() => {
      // Sign up a new user
      cy.request('POST', '/api/users', {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'testpassword',
      }).then((response) => {
        window.localStorage.setItem('user', JSON.stringify(response.body));
      });
  
      // Add a test product
      cy.request('POST', '/api/products', {
        name: 'Test Product',
        price: 10.99,
        description: 'Test Product Description',
      });
    });
  
    // Add remaining test cases here
});

it('adds a product to the cart', () => {
    // Go to the product page
    cy.visit('/products/1');
  
    // Add the product to the cart with a quantity of 2
    cy.get('.add-to-cart').click();
    cy.get('#quantity').clear().type('2');
    cy.get('.add-btn').click();
  
    // Verify that the product is added to the cart
    cy.get('.cart-items').should('contain', 'Test Product x 2');
});

it('adds a product to the cart', () => {
    // Go to the product page
    cy.visit('/products/1');
  
    // Add the product to the cart with a quantity of 2
    cy.get('.add-to-cart').click();
    cy.get('#quantity').clear().type('2');
    cy.get('.add-btn').click();
  
    // Verify that the product is added to the cart
    cy.get('.cart-items').should('contain', 'Test Product x 2');
});

it('views the cart items', () => {
    // Add a product to the cart with a quantity of 2
    cy.addProductToCart(1, 2);
  
    // Go to the cart page
    cy.visit('/cart');
  
    // Verify that the cart page displays the correct product and quantity
    cy.get('.cart-items').should('contain', 'Test Product x 2');
});

it('deletes a product from the cart', () => {
    // Add a product to the cart with a quantity of 2
    cy.addProductToCart(1, 2);
  
    // Go to the cart page
    cy.visit('/cart');
  
    // Delete the cart item
    cy.get(`[data-testid="delete-cart-item-1"]`).click();
  
    // Verify that the product is removed from the cart
    cy.get('.cart-items').should('not.contain', 'Test Product x 2');
});