<template>
    <div id="app">
        <Indicator/>
        <Header :style="{background: '#2d8cf0', height: 'auto'}" v-if="isHeaderRender()">
    		<Row type="flex" justify="space-between" align="middle">
				<Col>
					<div class="layout-logo">
						<h3 class="color-white txt-h3">Спецтранспорт</h3>
					</div>
				</Col>
				<Col>
					<Row type="flex" justify="center">
 						<MainMenu></MainMenu>
					</Row>
				</Col>
				<Col>
					<Row>
						<Dropdown>
							<Button type="primary">
								<Avatar icon="ios-person" size="large" />	
								<Icon type="ios-arrow-down"></Icon>
							</Button>
							<DropdownMenu slot="list">
								<DropdownItem>
									<button class="btn round" @click="logout">Выйти</button>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Row>
				</Col>
			</Row>
        </Header>

		
        <router-view></router-view>
    </div>
</template>

<script>
import Indicator from './components/Shared/Indicator.vue';
import MainMenu from './components/verstka/MainMenu.vue';

export default {
    name: 'app',
    components: {
        Indicator,
        MainMenu
    },
    methods: {
        isHeaderRender() {
            return localStorage.getItem('auth');
		},
		logout() {
			this.$root.logout();
		},
	},

}
</script>

<style>
	.main-wrapper{
		min-height: calc(100vh - 64px);
	}

</style>
