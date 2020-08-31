<template>
	<div class="shopping-item-deal">
		<div class="no-wrap-flex separator-top-dark" v-if="showDeal">
			<h4>Best deal</h4>
			<h5>
				{{ itemDeal.itemBrand }} {{ itemDeal.title }} at
				{{ itemDeal.shopTitle }}
			</h5>
			<h5 v-if="hasPrice">Price: &#8364; {{ itemDeal.price }}</h5>
		</div>
	</div>
</template>

<script>
export default {
	name: "ShopppingItemDeal",
	props: {
		itemDeal: Object
	},
	computed: {
		hasPrice() {
			if (this.itemDeal.price !== 0) {
				return true;
			} else return false;
		},
		showDeal() {
			if (
				this.itemDeal.price === 0 &&
				this.itemDeal.itemKeyword === "" &&
				this.itemDeal.itemBrand === "" &&
				this.itemDeal.shopTitle === ""
			) {
				return false;
			} else return true;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Variables";

.shopping-item-deal {
	margin-top: $extra-small-distance;
    margin-bottom: $extra-small-distance;
    h4{
        margin-top: $extra-small-distance;
    }
}
</style>