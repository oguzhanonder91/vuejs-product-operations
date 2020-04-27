export const productMixin = {
  data() {
    return {
      saveButtonClicked: false
    }
  },
  computed: {
    isLoading() {
      if (this.saveButtonClicked) {
        return {
          display: "block"
        }
      } else {
        return {
          display: "none"
        }
      }
    },
  },
};
