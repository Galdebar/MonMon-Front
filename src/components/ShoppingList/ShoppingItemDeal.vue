<template>
	<div class="shopping-item-deal">
		<div class="no-wrap-flex separator-top-dark" v-if="showDeal">
			<h5>
				{{ itemDeal.itemBrand }} {{ itemDeal.title }} at
				{{ itemDeal.shopTitle }}
			</h5>
			<h5 v-if="hasPrice">&#8364; {{ itemDeal.price }}</h5>
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
				(this.itemDeal.price === 0 &&
				this.itemDeal.title === "" &&
				this.itemDeal.brand === "" &&
				this.itemDeal.shopTitle === "") ||
				(this.itemDeal === null || this.itemDeal === undefined)
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
    h5{
        margin-top: $extra-small-distance;
    }
}
</style>