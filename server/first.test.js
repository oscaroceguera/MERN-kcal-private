// https://jestjs.io/docs/en/expect
/**
 * https://jestjs.io/docs/en/expect
 * Cuando escribimos pruebas, a menudo se necesita verificar que
 * los valores cumplan ciertas condiciones, expect le da acceso
 * a una serie de "matchers" (coincidencias) que le permiten validar
 * diferentes cosas.
 */

// Descripcion de la prueba
describe('My Test', () => {
  // Escenario y expectativa
  it('testing to see if works', () => {
    // expect(1).toBe(2)
    expect(2).toBe(2)
  })
})

/**
 * Antes de realizar una prueba debemos de seguir una estructura
 * para que otro progamador que no este familiarizado con el código
 * le sea mas facil leerlo. Esto se puede lograr mejor si las pruebas
 * hablan al nivel de los requisitos e incluyen 3 partes:
 * 1. ¿Que se quiere probar? producto, el metodo ProductService.addNewProduct
 * 2. ¿Bajo que sircunstancia y escenario? No se guarda el precio correctamente
 * 3. ¿Cual es resultado esperado? El nuevo producto no esta aprovado
 */

// 1. unit under test
describe('Products Service', () => {
  describe('Add new product', () => {
    // 2. scenario and 3. expectation 
    it('When no price is specified, then the product status is pending approval', () => {
      // const newProduct = new ProductService().add(...)
      const newProduct = { status: 'pendingApproval' }
      expect(newProduct.status).toBe('pendingApproval')
    })
  })
})
