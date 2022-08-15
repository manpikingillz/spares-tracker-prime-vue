<template>
	<div class="grid dashboard">
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-sales">
				<div class="overview-box-icon">
					<i class="pi pi-building"></i>
				</div>
				<div class="overview-box-title">Total Spare Parts</div>
				<div class="overview-box-value">{{ spareparts.length }} </div>
				<!-- <div class="overview-box-status"><b>200</b> Added this month. <b>50</b> Used this month</div> -->
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-views">
				<div class="overview-box-icon">
					<i class="pi pi-book"></i>
				</div>
				<div class="overview-box-title">Total Repairs</div>
				<div class="overview-box-value">{{ repairs.length }}</div>
				<!-- <div class="overview-box-status">10 done this month </div> -->
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-users">
				<div class="overview-box-icon">
					<i class="pi pi-car"></i>
				</div>
				<div class="overview-box-title">Total Vehicles</div>
				<div class="overview-box-value">{{ vehicles.length }}</div>
				<!-- <div class="overview-box-status">20 added this month </div> -->
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-3">
			<div class="overview-box box-checkins">
				<div class="overview-box-icon">
					<i class="pi pi-users"></i>
				</div>
				<div class="overview-box-title">Total Suppliers</div>
				<div class="overview-box-value">{{ suppliers.length }}</div>
				<!-- <div class="overview-box-status">10 added this month </div> -->
			</div>
		</div>

		<div class="col-12 lg:col-4">
			<div class="card donut ">
				<h5>Repairs</h5>
				<div class="container">
					<div class="donut-chart">
						<p>30%</p>
						<p>20%</p>
						<p>14%</p>
						<p>6%</p>
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
						<p class="center">{{ repairs.length}}<span>Total</span></p>
					</div>
					<div class="donut-chart-titles">
						<div class="detail1 title">
							<div class="color-code"></div>
							<p>Isuzu</p>
						</div>
						<div class="detail2 title">
							<div class="color-code"></div>
							<p>Toyota</p>
						</div>
						<div class="detail3 title">
							<div class="color-code"></div>
							<p>Suzuki</p>
						</div>
						<div class="detail4 title">
							<div class="color-code"></div>
							<p>Yamaha</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-4">
			<div class="card donut ">
				<h5>Available Spare Parts</h5>
				<div class="container">
					<div class="donut-chart">
						<p>15%</p>
						<p>20%</p>
						<p>30%</p>
						<p>10%</p>
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
						<p class="center">{{ spareparts.length }}<span>Total</span></p>
					</div>
					<div class="donut-chart-titles">
						<div class="detail1 title">
							<div class="color-code"></div>
							<p>Isuzu</p>
						</div>
						<div class="detail2 title">
							<div class="color-code"></div>
							<p>Toyota</p>
						</div>
						<div class="detail3 title">
							<div class="color-code"></div>
							<p>Suzuki</p>
						</div>
						<div class="detail4 title">
							<div class="color-code"></div>
							<p>Yamaha</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 md:col-6 lg:col-4">
			<div class="card donut ">
				<h5>Available Vehicles</h5>
				<div class="container">
					<div class="donut-chart">
						<p>8%</p>
						<p>5%</p>
						<p>4%</p>
						<p>3%</p>
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
						<p class="center">{{ vehicles.length }}<span>Total</span></p>
					</div>
					<div class="donut-chart-titles">
						<div class="detail1 title">
							<div class="color-code"></div>
							<p>Isuzu</p>
						</div>
						<div class="detail2 title">
							<div class="color-code"></div>
							<p>Toyota</p>
						</div>
						<div class="detail3 title">
							<div class="color-code"></div>
							<p>Suzuki</p>
						</div>
						<div class="detail4 title">
							<div class="color-code"></div>
							<p>Yamaha</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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

	async created() {
		this.productService = new ProductService();
		await this.fetchSuppliers();
		await this.fetchVehicles();
		await this.fetchRepairs();
		await this.fetchSpareparts();
	},
	mounted() {
		this.productService.getProductsSmall().then(data => this.products = data);
	},

	computed: {
		...mapState('suppliers', ['suppliers']),
		...mapState('vehicles', ['vehicles']),
		...mapState('repairs', ['repairs']),
		...mapState('spareparts', ['spareparts']),
	},

	methods: {
		...mapActions('suppliers', ['fetchSuppliers']),
		...mapActions('vehicles', ['fetchVehicles']),
		...mapActions('repairs', ['fetchRepairs']),
		...mapActions('spareparts', ['fetchSpareparts']),

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
