<template>
	<div id="shopping-list-in-cart" class="wrapper">
		<h1>{{ title }}</h1>
		<div class="container">
			<div class="top">
				<div class="no-wrap-flex default-padding">
					<BtnStandard v-on:action="deleteAllItems">
						Clear
					</BtnStandard>
					<BtnStandard v-on:action="unmarkAllItems">
						Uncheck All
					</BtnStandard>
				</div>
			</div>
			<transition-group name="list-complete">
				<ShoppingItemInCart
					v-for="item in itemsInCart"
					v-bind:shopping-item-d-t-o="item"
					v-bind:key="item.id"
					class="list-complete-item"
				/>
			</transition-group>
		</div>
	</div>
</template>

<script>
import ShoppingItemInCart from "./ShoppingItemInCart";
import BtnStandard from "../CommonElements/BtnStandard";

export default {
	name: "ShoppingListInCart",
	components: {
        ShoppingItemInCart,
        BtnStandard
	},
	data() {
		return {
			title: "In Cart"
		};
	},
	computed: {
		itemsInCart() {
			return this.$store.getters.getItems(true);
		}
	},
	methods: {
		async deleteAllItems() {
			this.$store.dispatch("deleteItemsInCart");
		},
		async unmarkAllItems() {
			this.$store.dispatch("unmarkItemsInCart");
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/Variables";

#shopping-list-in-cart {
	h1 {
		display: inline-block;
		background-color: $brand-yellow;
		color: $default-black;
		padding: $small-distance;
		border-radius: $extra-small-distance;
		margin-left: $default-distance;
		transform: translateY(50%);
	}
	.top {
		margin-bottom: $default-distance;
	}

	.container {
		padding-top: $large-distance;

		background-color: $slightly-darker-bg;
		margin-bottom: $bottom-bar-height + $default-distance;
	}

	.list-complete-item {
		transition: all $fast-transition;
	}
	.list-complete-enter,
	.list-complete-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}
	.list-complete-leave-active {
		position: absolute;
	}
}
</style>