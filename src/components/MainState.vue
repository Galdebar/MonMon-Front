<template>
	<div>
		<Header ref="header" @hideOverlay="triggerOverlay" />
		<EditItem
			ref="editItemView"
			@triggerOverlay="triggerOverlay"
			@refreshList="refreshList"
		/>
		<div id="changing-bar">
			<TopBar @moveHeader="moveHeader" />
			<BottomBar @refreshList="refreshList" />
		</div>
		<div
			id="main-color-overlay"
			v-bind:class="{ hidden: !isOverlayShown }"
		></div>
		<ShoppingListMain ref="shoppingListMain" @editItem="editItem" />
	</div>
</template>

<script>
import Header from "./Header/Header";
import TopBar from "./ShoppingList/TopBar";
import ShoppingListMain from "./ShoppingList/ShoppingListMain";
import BottomBar from "./ShoppingList/BottomBar";
import EditItem from "./EditItem";

export default {
	name: "MainState",
	components: {
		Header,
		TopBar,
		ShoppingListMain,
		BottomBar,
		EditItem,
	},
	data() {
		return {
			isEditingItem: false,
			isOverlayShown: false,
		};
	},
	mounted() {
		this.$store.dispatch("loadItemsAndCategories");
	},
	methods: {
		moveHeader() {
			this.$refs.header.moveHeader();
			this.triggerOverlay();
		},
		triggerOverlay() {
			this.isOverlayShown = !this.isOverlayShown;
		},
		refreshList() {},
		editItem(shoppingItemDTO) {
			this.$refs.editItemView.triggerView(shoppingItemDTO);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/Variables";

@media only screen and (max-width: 768px) {
	#changing-bar {
		width: 100%;
		box-sizing: border-box;
		height:$bottom-bar-height;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}
}
</style>