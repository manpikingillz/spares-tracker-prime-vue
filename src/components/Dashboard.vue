<template>
	<div class="grid dashboard">
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-sales">
				<div class="overview-box-icon">
					<i class="pi pi-building"></i>
				</div>
				<div class="overview-box-title">Total Spare Parts</div>
				<div class="overview-box-value">5092 </div>
				<div class="overview-box-status"><b>200</b> Added this month. <b>50</b> Used this month</div>
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-views">
				<div class="overview-box-icon">
					<i class="pi pi-book"></i>
				</div>
				<div class="overview-box-title">Total Repairs Done</div>
				<div class="overview-box-value">70</div>
				<div class="overview-box-status">10 done this month </div>
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-users">
				<div class="overview-box-icon">
					<i class="pi pi-car"></i>
				</div>
				<div class="overview-box-title">Total Vehicles</div>
				<div class="overview-box-value">9522</div>
				<div class="overview-box-status">20 added this month </div>
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-checkins">
				<div class="overview-box-icon">
					<i class="pi pi-users"></i>
				</div>
				<div class="overview-box-title">Total Suppliers</div>
				<div class="overview-box-value">11</div>
				<div class="overview-box-status">10 added this month </div>
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

		<div class="col-12 md:col-6  lg:col-4">
			<div class="card tasks">
				<h5>Tasks</h5>
				<ul>
					<li>
						<Checkbox name="task" value="reports" v-model="tasksCheckbox" />
						<span>Sales Report</span>
						<span class="task-badge-open">Open<i class="pi pi-circle-on"></i></span>
					</li>
					<li>
						<Checkbox name="task" value="invoices" v-model="tasksCheckbox" />
						<span>Pay Invoices</span>
						<span class="task-badge-open">Open<i class="pi pi-circle-on"></i></span>
					</li>
					<li>
						<Checkbox name="task" value="party" v-model="tasksCheckbox" />
						<span>Birthday Party</span>
						<span class="task-badge-open">Open<i class="pi pi-circle-on"></i></span>
					</li>
					<li>
						<Checkbox name="task" value="meeting" v-model="tasksCheckbox" />
						<span>Client Meeting</span>
						<span class="task-badge-closed">Closed<i class="pi pi-circle-on"></i></span>
					</li>
					<li>
						<Checkbox name="task" value="themes" v-model="tasksCheckbox" />
						<span>New Themes</span>
						<span class="task-badge-closed">Closed<i class="pi pi-circle-on"></i></span>
					</li>
					<li>
						<Checkbox name="task" value="ticket" v-model="tasksCheckbox" />
						<span>Flight Ticket</span>
						<span class="task-badge-closed">Closed<i class="pi pi-circle-on"></i></span>
					</li>
				</ul>
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

	</div>
</template>

<script>
import ProductService from '../service/ProductService';

export default {
	data() {
		return {
			tasksCheckbox: [],
			chartData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
					{
						label: 'Sales',
						data: [12, 19, 3, 5, 2, 3, 9],
						borderColor: [
							'#4CAF50',
						],
						borderWidth: 3,
						borderDash:[5, 5],
						fill: false,
						pointRadius: 3,
						tension: .4
					},
					{
						label: 'Income',
						data: [1, 2, 5, 3, 12, 7, 15],
						backgroundColor: [
							'rgba(187,222,251,0.2)',
						],
						borderColor: [
							'#00BCD4',
						],
						borderWidth: 3,
						fill: true,
						tension: .4
					},
					{
						label: 'Expenses',
						data: [7, 12, 15, 5, 3, 13, 21],
						borderColor: [
							'#e91e63',
						],
						borderWidth: 3,
						fill: false,
						pointRadius: [4, 6, 4, 12, 8, 0, 4],
						tension: .4
					},
					{
						label: 'New Users',
						data: [3, 7, 2, 17, 15, 13, 19],
						borderColor: [
							'#FF8F00',
						],
						borderWidth: 3,
						fill: false,
						tension: .4
					}
				]
			},
			chartOptions: {
                responsive: true,
                hover: {
                    mode: 'index'
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
			},
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
	productService: null,
	created() {
		this.productService = new ProductService();
	},
	mounted() {
		this.productService.getProductsSmall().then(data => this.products = data);
	},
	methods: {
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		menuToggle(event) {
			this.$refs.menu.toggle(event);
		}
	}
}
</script>

<style scoped>

</style>
