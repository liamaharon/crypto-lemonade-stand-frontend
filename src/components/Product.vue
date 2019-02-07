<template>
  <div>
    <div class="box wrapper">
      <span>Name: {{ name }}</span>
      <span>Ticker: {{ ticker }}</span>
      <span>Details: {{ details }}</span>
      <span>Price: {{ price }}</span>
      <button
        class="button is-primary"
        @click="showModal"
      >
        Edit
      </button>
    </div>
    <div
      class="modal"
      :class="{'is-active': modalActive}"
    >
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Editing product
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="hideModal"
          />
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">
              Name
            </label>
            <div class="control">
              <input
                v-model="editForm.name"
                class="input"
                type="text"
                placeholder="Bitcoin"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">
              Ticker
            </label>
            <div class="control">
              <input
                v-model="editForm.ticker"
                class="input"
                type="text"
                placeholder="BTC"
              >
            </div>
          </div>
          <div class="field">
            <label class="label">
              Details
            </label>
            <div class="control">
              <input
                v-model="editForm.details"
                class="input"
                type="text"
                placeholder="Crypto asset..."
              >
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            :class="{'is-loading': isUpdating}"
            @click="() => updateProduct(editForm)"
          >
            Save changes
          </button>
          <button
            class="button"
            @click="hideModal"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  props: {
    name: String,
    ticker: String,
    details: String,
    price: String,
    isUpdating: Boolean,
    updateProduct: Function
  },
  data: function() {
    return {
      modalActive: false,
      editForm: {
        name: this.name,
        ticker: this.ticker,
        details: this.details
      }
    };
  },
  watch: {
    // after a product finishes updating, the modal should close
    isUpdating: function(next, prev) {
      if (prev && !next) this.hideModal();
    }
  },
  methods: {
    showModal: function() {
      this.modalActive = true;
    },
    hideModal: function() {
      // close modal and reset form
      this.modalActive = false;
      this.editForm = {
        name: this.name,
        ticker: this.ticker,
        details: this.details
      };
    },
    onClickSave: function() {
      this.updateProduct({
        name: this.name,
        ticker: this.ticker,
        details: this.details,
        price: this.price,
        ...this.editForm
      });
    },
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.label {
  text-align: left;
}
.modal-card {
  width: 30rem;
}
</style>
