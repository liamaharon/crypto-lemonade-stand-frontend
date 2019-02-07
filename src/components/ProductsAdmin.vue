<template>
  <div>
    <h1 class="is-size-1">
      All products
    </h1>
    <article
      v-if="products.error"
      class="message is-danger"
    >
      <div class="message-body">
        Something went wrong.
        <br>
        <span class="login-error-msg">
          {{ products.error }}
        </span>
      </div>
    </article>
    <div>
      <div
        v-for="product in products.data"
        :key="product.id"
      >
        <product 
          class="product"
          :name="product.name"
          :ticker="product.ticker"
          :details="product.details"
          :price="product.price || 'Unknown'"
          :update-product="(newProduct) => updateProduct(product.id, newProduct)"
          :is-updating="!!productsUpdating[product.id]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product';

export default {
  name: "ProductsAdmin",
  components: {
    Product
  },
  props: {
    products: Object,
    productsUpdating: Object,
    updateProduct: Function
  }
};
</script>

<style scoped>
.product {
  margin-bottom: 1rem;
}
</style>
