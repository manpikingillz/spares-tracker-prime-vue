<template>
	<div class="layout-topbar">
		<div class="layout-topbar-logo" @click="$router.push({path: '/'})">
			<img class="logo" src="layout/images/police-logo2.png" alt="">
        </div>

        <a class="layout-menu-button" href="#" @click="onMenuButtonClick">
            <i class="pi pi-bars"></i>
        </a>

		<ul class="layout-topbar-menu">
			<li :class="[{'active-topmenuitem': activeTopbarItem === 'profile'}]" class="user-profile"
				@click="$emit('topbar-item-click',{originalEvent:$event,item:'profile'})">
				<a href="#">
					<div class="user-profile-info profile-link">
						<span class="user-profile-name">Gilbert Twesigomwe</span>
						<span class="user-profile-role">Mechanical Engineer</span>
					</div>
					<img class="logo" src="layout/images/avatar/avatar-ava.jpg" alt="prestige-layout" />
				</a>
				<transition name="layout-submenu-container">
					<ul class="fadeInDown" v-show="activeTopbarItem === 'profile'">
						<li class="profile-detail">
							<div class="user-profile-info">
								<img class="logo" src="layout/images/avatar/avatar-ava.jpg" alt="prestige-layout" />
								<div class="profile-info">
									<span class="user-profile-name">Gilbert Twesigomwe</span>
									<span class="user-profile-role">Mechanical Engineer</span>
								</div>
							</div>
						</li>
						<li>
							<a href="#" >
								<i class="pi pi-user"></i>
								<div class="menu-text">
									<span class="menu-title">Profile</span>
									<span class="menu-subtitle">View your profile</span>
								</div>

								<i class="right-icon pi pi-angle-right"></i>
							</a>
						</li>
						<li>
							<a href="#" >
								<i class="pi pi-inbox"></i>
								<div class="menu-text">
									<span class="menu-title">Messages</span>
									<span class="menu-subtitle">You have a <div class="blue">3 new</div> messages</span>
								</div>
								<i class="right-icon pi pi-angle-right"></i>
							</a>
						</li>
						<li>
							<router-link to="/login">
							<a href="#" >
								<i class="topbar-icon pi pi-sign-out"></i>
								<div class="menu-text">
									<span class="menu-title">Logout</span>
									<span class="menu-subtitle">No new notification</span>
								</div>
								<i class="right-icon pi pi-angle-right"></i>
							</a>
							</router-link>
						</li>
					</ul>
				</transition>
			</li>
		</ul>

	</div>
</template>

<script>
	export default {
		emits: ['topbar-item-click', 'menubutton-click', 'topbar-menubutton-click'],
		props: {
			topbarMenuActive: Boolean,
			activeTopbarItem: String
		},
		methods: {
			onMenuButtonClick(event) {
				this.$emit('menubutton-click', event);
			},
			onTopbarMenuButtonClick(event) {
				this.$emit('topbar-menubutton-click', event);
			}
		},
		computed: {

		}
	}
</script>
