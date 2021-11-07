export default function toastFunc (variant) {
  this.$bvToast.toast('Toast body content', {
    title: `Variant ${variant || 'default'}`,
    variant: variant,
    solid: true
  })
}
