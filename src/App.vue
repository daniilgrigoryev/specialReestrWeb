<template>
    <div id="app">
        <Indicator/>
        <Header class="page_header" :style="{background: '#2d8cf0', height: 'auto', padding: '0 20px 0 20px'}" v-if="isHeaderRender()">
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
					<Row type="flex" justify="center" >
						<div class="flex-parent flex-parent--center-cross">
							<span class="mr12 color-white">Даниил Григорьев</span>
							<Dropdown>
								<a href="javascript:void(0)" class="flex-parent flex-parent--center-cross">
									<Badge class="block" text="new">
										<Avatar shape="square" class="block" icon="ios-person" size="large" />
									</Badge>
									<Icon type="ios-arrow-down ml12" class="color-white"></Icon>
								</a>
								<DropdownMenu slot="list">
									<DropdownItem>
										<a href="javascript:void(0)" @click="logout">
											<span>Выйти</span>
											<Icon type="ios-log-in" size="15"/>
										</a>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
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
	.height100-header{
		min-height: calc(100vh - 64px);
	}
</style>
