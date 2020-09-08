<template>
	<div id="bottom-bar" class="container">
		<form
			class="wrapper no-wrap-flex"
			name="add-item"
			v-on:submit.prevent="addItem"
		>
			<input
				type="text"
				autocomplete="off"
				list="newItemsList"
				name="newItem"
				v-model="newItemName"
				placeholder="Enter item name"
			/>
			<datalist v-if="canShowSuggestions" id="newItemsList" name="newItemsList">
				<option
					v-for="(searchResult, index) in searchResults"
					v-bind:value="searchResult.keyword"
					v-bind:key="index"
				>
					{{ searchResult.keyword }}
				</option>
			</datalist>
			<button class="add-item-btn">
				<PlusIcon></PlusIcon>
			</button>
		</form>
	</div>
</template>

<script>
import PlusIcon from "../CommonElements/Icons/PlusIcon";

export default {
	name: "BottomBar",
	components: {
		PlusIcon,
	},
	data() {
		return {
			newItemName: "",
			searchResults: [],
		};
	},
	computed: {
		canShowSuggestions: function () {
			if (
				this.searchResults.length === 1 &&
				this.searchResults[0] === this.newItemName
			) {
				return false;
			} else return true;
		},
	},
	watch: {
		newItemName: function () {
			this.search();
		},
	},
	methods: {
		async addItem() {
			const item = this.createShoppingItem();
			if (this.newItemName !== "") {
				let isItemAdded = await this.$store.dispatch(
					"addNewShoppingItem",
					item
				);
				if (isItemAdded) {
					this.clearValues();
				}
			} else {
				console.log("No item name specified-- should do something :P");
			}
		},
		async search() {
			if (this.newItemName.trim() !== "") {
				let response = await this.$store.dispatch("search", this.newItemName);
				this.searchResults = response;
			}
		},
		clearValues() {
			this.newItemName = "";
		},
		createShoppingItem() {
			return {
				itemName: this.newItemName,
				itemCategory: "",
				quantity: 1,
				comment: "",
				isInCart: false,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Variables";

#bottom-bar {
	position: fixed;
	background-color: $brand-yellow;
	bottom: $default-distance;
	right: 0;
	width: 90vw;
	height: $bottom-bar-height;
	z-index: 5;
	padding-top: $small-distance;
	padding-right: $default-distance;
	padding: 0 $default-distance;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;

	form {
		flex-direction: row;
		datalist {
			display: none;
		}
	}

	.add-item-btn {
		background-color: $default-white;
		width: $large-distance + $default-distance;
		height: $large-distance + $default-distance;
		box-sizing: border-box;
		position: relative;
		border-radius: 50%;
	}
}

@media only screen and (max-width: 768px) {
	#bottom-bar {
		position:static!important;
		box-shadow: none;
        z-index: inherit;

	}
}
</style>