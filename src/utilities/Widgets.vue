<template>
	<div>
		<h4>Reusable CSS widgets for your applications.</h4>
		<div class="grid dashboard">
			<div class="col-12">
				<div class="card">
					<h4>Overview Boxes</h4>
					<div class="grid">
						<div class="col-12 md:col-6 lg:col-3">
							<div class="overview-box box-sales">
								<div class="overview-box-icon">
									<i class="pi pi-dollar"></i>
								</div>
								<div class="overview-box-title">Sales</div>
								<div class="overview-box-value">$ 92,440 </div>
								<div class="overview-box-status"><b>20%</b> more than yesterday</div>
							</div>
						</div>
						<div class="col-12 md:col-6 lg:col-3">
							<div class="overview-box box-views">
								<div class="overview-box-icon">
									<i class="pi pi-search"></i>
								</div>
								<div class="overview-box-title">Views</div>
								<div class="overview-box-value">7029</div>
								<div class="overview-box-status"><b>7%</b> more than yesterday </div>
							</div>
						</div>
						<div class="col-12 md:col-6 lg:col-3">
							<div class="overview-box box-users">
								<div class="overview-box-icon">
									<i class="pi pi-user"></i>
								</div>
								<div class="overview-box-title">Users</div>
								<div class="overview-box-value">9522</div>
								<div class="overview-box-status"><b>12%</b> more than yesterday </div>
							</div>
						</div>
						<div class="col-12 md:col-6 lg:col-3">
							<div class="overview-box box-checkins">
								<div class="overview-box-icon">
									<i class="pi pi-map-marker"></i>
								</div>
								<div class="overview-box-title">Check-ins</div>
								<div class="overview-box-value">4211</div>
								<div class="overview-box-status"><b>3%</b> more than yesterday </div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12 lg:col-8">
				<div class="card timeline">
					<h5>Timeline</h5>
					<ul>
						<li>
							<div class="grid">
								<div class="col-fixed">
									<div class="timeline-icon">
										<i class="pi pi-inbox"></i>
									</div>
								</div>
								<div class="col">
									<div class="time-line-event">
										<span class="timeline-event-title">Message Recived</span>
										<div class="timeline-event-message">Unexpected event happened near San Mateo
										</div>
										<div class="timeline-event-time">
											2 mins ago
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="grid">
								<div class="col-fixed">
									<div class="timeline-icon">
										<i class="pi pi-wifi"></i>
									</div>
								</div>
								<div class="col">
									<div class="time-line-event">
										<span class="timeline-event-title">Network Issue</span>
										<div class="timeline-event-message">Unexpected problem on mail service
										</div>
										<div class="timeline-event-time">
											22 mins ago
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="grid">
								<div class="col-fixed">
									<div class="timeline-icon">
										<i class="pi pi-inbox"></i>
									</div>
								</div>
								<div class="col">
									<div class="time-line-event">
										<span class="timeline-event-title">Message Recived</span>
										<div class="timeline-event-message">Warren Shaw finished Task #21</div>
										<div class="timeline-event-time">
											24 mins ago
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="grid">
								<div class="col-fixed">
									<div class="timeline-icon">
										<i class="pi pi-video"></i>
									</div>
								</div>
								<div class="col">
									<div class="time-line-event">
										<span class="timeline-event-title">Video Recorded</span>
										<div class="timeline-event-message">Brenda Soto recorded unexpected event
											that happen near Santa Rosa
										</div>
										<div class="timeline-event-time">
											34 mins ago
										</div>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="grid">
								<div class="col-fixed">
									<div class="timeline-icon">
										<i class="pi pi-map-marker"></i>
									</div>
								</div>
								<div class="col">
									<div class="time-line-event">
										<span class="timeline-event-title">Location Shared</span>
										<div class="timeline-event-message">John Swisher shared new location on
											Vallejo</div>
										<div class="timeline-event-time">
											42 mins ago
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div class="col-12 lg:col-4">
				<div class="card chat">
					<h5>Chat</h5>
					<ul>
						<li class="message-from">
							<div class="grid">
								<div class="col-fixed">
									<img src="layout/images/avatar/avatar-kate.jpg" alt="">
								</div>
								<div class="col">
									<div class="chat-profile-info">
										<span class="chat-profile">Kate</span>
										<span class="chat-profile-job">Managment</span>
									</div>
									<div class="chat-message">Hey Yeniffer And Micheal, I heard there is a task
										about unexpected event occured near San Mateo recently. Can you guys handle
										today?</div>
									<div class="message-time">
										22 mins ago
									</div>
								</div>
							</div>
						</li>
						<li class="message-to">
							<div class="grid">
								<div class="col-fixed">
									<img src="layout/images/avatar/avatar-yeniffer.jpg" alt="">
								</div>
								<div class="col">
									<div class="chat-profile-info">
										<span class="chat-profile">Yeniffer</span>
										<span class="chat-profile-job">Development</span>
									</div>
									<div class="chat-message">I’m busy today but we can work on it on Sunday
										afternoon. Does that sounds good for you Micheal?</div>
									<div class="message-time">
										12 mins ago
									</div>
								</div>
							</div>
						</li>
						<li class="message-from">
							<div class="grid">
								<div class="col-fixed">
									<img src="layout/images/avatar/avatar-micheal.jpg" alt="">
								</div>
								<div class="col">
									<div class="chat-profile-info">
										<span class="chat-profile">Micheal</span>
										<span class="chat-profile-job">Design</span>
									</div>
									<div class="chat-message">Sounds good for me.</div>
									<div class="message-time">
										2 mins ago
									</div>
								</div>
							</div>
						</li>
						<li class="message-to">
							<div class="grid">
								<div class="col-fixed">
									<img src="layout/images/avatar/avatar-yeniffer.jpg" alt="">
								</div>
								<div class="col">
									<div class="chat-profile-info">
										<span class="chat-profile">Yeniffer</span>
										<span class="chat-profile-job">Development</span>
									</div>
									<div class="chat-message">Great! See you on Sunday. Don't forget the bring coffee :)</div>
									<div class="message-time">
										12 mins ago
									</div>
								</div>
							</div>
						</li>
					</ul>
					<div class="new-message">
						<div class="grid grid-nogutter">
							<div class="col">
								<input placeholder="Write your message.." />
							</div>
							<div class="col-fixed">
								<button><i class="pi pi-paperclip"></i></button>
								<button><i class="pi pi-upload"></i></button>
								<button><i class="pi pi-save"></i></button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12 lg:col-4">
				<div class="card donut ">
					<h5>Income Statistics</h5>
					<div class="container">
						<div class="donut-chart">
							<p>%48</p>
							<p>%16</p>
							<p>%33</p>
							<p>%6</p>
							<div class="part1 portion-block">
								<div class="circle"></div>
							</div>
							<div class="part2 portion-block">
								<div class="circle"></div>
							</div>
							<div class="part3 portion-block">
								<div class="circle"></div>
							</div>
							<div class="part4 portion-block">
								<div class="circle"></div>
							</div>
							<div class="part5 portion-block">
								<div class="circle"></div>
							</div>
							<p class="center">$23,904<span>Total</span></p>
						</div>
						<div class="donut-chart-titles">
							<div class="detail1 title">
								<div class="color-code"></div>
								<p>Detail 1</p>
							</div>
							<div class="detail2 title">
								<div class="color-code"></div>
								<p>Detail 2</p>
							</div>
							<div class="detail3 title">
								<div class="color-code"></div>
								<p>Detail 3</p>
							</div>
							<div class="detail4 title">
								<div class="color-code"></div>
								<p>Detail 4</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-12 md:col-6 lg:col-4">
				<div class="card progress-card">
					<h5>Great News!</h5>
					<p>Podcasting operational change management inside of workflows to establish a framework. Collaboratively administrate empowered markets via plug-and-play networks.</p>
					<div class="progressbars">
						<ul>
							<li class="grid">
								<label class="col-fixed">Sapphire</label>
								<div class="progressbar col-fixed">
									<div class="progress" style="width:70%;"></div>
								</div>
							</li>
							<li class="grid">
								<label class="col-fixed">Roma</label>
								<div class="progressbar col-fixed">
									<div class="progress" style="width:60%;"></div>
								</div>
							</li>
							<li class="grid">
								<label class="col-fixed">Ultima</label>
								<div class="progressbar col-fixed">
									<div class="progress" style="width:65%;"></div>
								</div>
							</li>
							<li class="grid">
								<label class="col-fixed">Barcelona</label>
								<div class="progressbar col-fixed">
									<div class="progress" style="width:30%;"></div>
								</div>
							</li>
							<li class="grid">
								<label class="col-fixed">Prestige</label>
								<div class="progressbar col-fixed">
									<div class="progress" style="width:85%;"></div>
								</div>
							</li>
						</ul>
					</div>
					<div class="month-buttons">
						<a><i class="pi pi-angle-left"></i> Previous Month</a>
						<a>Next Month <i class="pi pi-angle-right"></i></a>
					</div>
				</div>
			</div>
			
			<div class="col-12 md:col-6 lg:col-4">
				<div class="card statistics grid grid-nogutter direction-column justify-content-between">
					<ul>
						<li>
							<img src="layout/images/dashboard/bmw.jpg" alt="">
							<div class="car-box">
								<span class="car-info">BMW | 2018, Black</span>
								<span class="car-id">#156122641</span>
							</div>
							<div class="percentage">
								+%44
							</div>
						</li>
						<li>
							<img src="layout/images/dashboard/honda.jpg" alt="">
							<div class="car-box">
								<span class="car-info">Honda | 2019, White</span>
								<span class="car-id">#995123552</span>
							</div>
							<div class="percentage">
								+%44
							</div>
						</li>
						<li>
							<img src="layout/images/dashboard/volkswagen.jpg" alt="">
							<div class="car-box">
								<span class="car-info">Volkswagen | 2000, Red</span>
								<span class="car-id">#480016380</span>
							</div>
							<div class="percentage">
								+%44
							</div>
						</li>
					</ul>
					<img class="statistic" src="layout/images/dashboard/graph@2x.png" alt="">
				</div>
			</div>

			<div class="col-12 md:col-6 lg:col-4">
				<div class="card resolution-center ">
					<h5>Resolution Center</h5>
					<div class="p-inputgroup">
						<span class="p-inputgroup-addon">
							<i class="pi pi-user"></i>
						</span>
						<InputText placeholder="Username" />
					</div>
					<div class="p-inputgroup">
						<span class="p-inputgroup-addon">
							<i class="pi pi-envelope"></i>
						</span>
						<InputText placeholder="E-Mail" />
					</div>
					<Textarea v-model="textAreaValue" rows="9" cols="30" placeholder="Your Message"  />
					<div class="resolution-button-bar">
						<Button type="button" label="Send Message" />
						<a>View old messages</a>
					</div>
				</div>
			</div>

			<div class="col-12 lg:col-4">
				<div class="card team">
					<h5>Team Members</h5>
					<ul>
						<li>
							<img src="layout/images/avatar/avatar-pedro.jpg" alt="">
							<div class="team-box">
								<span class="team-member">
									<div class="team-member-status"></div>Pedro Anorim
								</span>
								<span class="team-member-job">Development</span>
							</div>
							<Button type="button" label="Add" />
						</li>
						<li>
							<img src="layout/images/avatar/avatar-daisy.jpg" alt="">
							<div class="team-box">
								<span class="team-member">
									<div class="team-member-status"></div>Daisy Murphy
								</span>
								<span class="team-member-job">Design</span>
							</div>
							<Button type="button" label="Add" />
						</li>
						<li>
							<img src="layout/images/avatar/avatar-mbah.jpg" alt="">
							<div class="team-box">
								<span class="team-member">
									<div class="team-member-status"></div>Mbah ENow
								</span>
								<span class="team-member-job">Management</span>
							</div>
							<Button type="button" label="Add" />
						</li>
						<li>
							<img src="layout/images/avatar/avatar-qin.jpg" alt="">
							<div class="team-box">
								<span class="team-member">
									<div class="team-member-status"></div>Qin Shi
								</span>
								<span class="team-member-job">Management</span>
							</div>
						<Button type="button" label="Add" />
						</li>
					</ul>
					<div class="all-members-link">
						<a>See all team members</a>
					</div>
				</div>
			</div>

			<div class="col-12 md:col-6  lg:col-4">
				<div class="card user-card">
					<div class="user-card-header">
						<img src="layout/images/dashboard/bg-head.jpg" alt="">
					</div>
					<div class="user-card-content">
						<img src="layout/images/avatar/avatar-igor.jpg" alt="">
						<Menu ref="menu" :model="items" :popup="true" appendTo="body" />
						<Button type="button" icon="pi pi-cog" @click="menuToggle"/>

						<div class="user-card-name">
							<span>Igor Antonovich</span>
						</div>
						<div class="user-card-status">
							<span>Administrator</span>
						</div>
						<div class="user-detail">
							<ul>
								<li>
									Followers <div class="value">1098 <i class="pi pi-arrow-circle-right"></i>
									</div>
								</li>
								<li>
									Following <div class="value">22,681 <i class="pi pi-arrow-circle-right"></i>
									</div>
								</li>
								<li>
									Likes <div class="value">880 <i class="pi pi-arrow-circle-right"></i></div>
								</li>
								<li>
									Views <div class="value">1298 <i class="pi pi-arrow-circle-right"></i></div>
								</li>

							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tasksCheckbox: [],
			textAreaValue:"",
			products: null,
			selectedProduct: null,
			items: [
				{ label: 'Save', icon: 'pi pi-fw pi-check' },
				{ label: 'Update', icon: 'pi pi-fw pi-refresh' },
				{ label: 'Delete', icon: 'pi pi-fw pi-trash' }
			]
		}
	},
	methods: {
		menuToggle(event) {
			this.$refs.menu.toggle(event);
		}
	}
}
</script>

<style scoped>

</style>
