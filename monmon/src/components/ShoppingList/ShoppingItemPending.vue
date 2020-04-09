<template>
	<div class="shopping-item default-padding">
		<a v-on:click="editItem">
			<EditItemIcon></EditItemIcon>
		</a>
		<div class="text">
			<h3>
				{{ shoppingItemDTO.itemName }}
				<span v-if="shoppingItemDTO.quantity !== 0">
					{{ shoppingItemDTO.quantity }}
				</span>
			</h3>
			<h5 v-bind:class="{ shown: shoppingItemDTO.comment.length > 0 }">
				{{ shoppingItemDTO.comment }}
			</h5>
		</div>

		<button v-on:click="markAsBought" />
	</div>
</template>
<script>
import EditItemIcon from "../CommonElements/Icons/EditItemIcon";

export default {
	name: "ShoppingItemPending",
	components: {
		EditItemIcon
	},
	props: {
		shoppingItemDTO: Object
	},
	data() {
		return {
			shoppingItem: {}
		};
	},

	methods: {
		editItem() {
			this.$emit("editItem", this.createShoppingItem());
		},
		async markAsBought() {
			let tempShoppingItem = this.createShoppingItem();
			tempShoppingItem.isInCart = true;
			this.$store.dispatch("updateItem", tempShoppingItem);
		},
		createShoppingItem() {
			return {
				id: this.shoppingItemDTO.id,
				itemName: this.shoppingItemDTO.itemName,
				itemCategory: this.shoppingItemDTO.itemCategory,
				quantity: this.shoppingItemDTO.quantity,
				comment: this.shoppingItemDTO.comment,
				isInCart: this.shoppingItemDTO.isInCart
			};
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Variables";

.shopping-item {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: $small-distance;

	.text {
		margin: 0 $default-distance;
		justify-self: flex-start;
		width: 100%;
		overflow: hidden;

		h5 {
			color: $grey;
			margin-top: 0;
		}
		h5.shown {
			margin-top: $small-distance;
		}
	}

	button {
		justify-self: flex-end;
	}
}
</style>