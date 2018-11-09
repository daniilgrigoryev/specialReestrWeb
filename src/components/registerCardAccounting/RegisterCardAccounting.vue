<template>
	<!--<div style="display: flex; flex-direction: column;">
	    <button type="button" @click="getPrev">Назад</button>
	
	    <div style="display: flex;">
	      <div v-if="cardAccounting.item" style="display: flex; flex-direction: column; width: 60%">
	        <div>
	          <div style="display: flex; flex-direction: column;">
	            <span>Разрешение</span>
	            <div>
	              <span>Статус</span>
	            </div>
	            <div>
	              <span>Дата окончания</span>
	            </div>
	            <div>
	              <span>Срок действия</span>
	            </div>
	            <div>
	              <span>Дата обновления</span>
	            </div>
	          </div>
	          <div style="display: flex; flex-direction: column;">
	            <span>Транспортное средство</span>
	            <div>
	              <span>ГРЗ</span>
	            </div>
	            <div>
	              <span>Марка ТС</span>
	            </div>
	            <div>
	              <span>Модель</span>
	            </div>
	            <div>
	              <span>Тип ТС</span>
	            </div>
	          </div>
	        </div>
	        <div>
	          <div style="display: flex; flex-direction: column;">
	            <span>Системные сведения</span>
	            <div>
	              <span>Источник</span>
	            </div>
	            <div>
	              <span>Основание</span>
	            </div>
	            <div>
	              <span>Описание</span>
	            </div>
	          </div>
	          <div style="display: flex; flex-direction: column;">
	            <span>Владелец</span>
	            <div>
	              <span>Фамилия(Организация)</span>
	            </div>
	            <div>
	              <span>Адрес</span>
	            </div>
	            <div>
	              <span>Телефон</span>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div v-if="cardAccounting.fisItem" style="display: flex; flex-direction: column; width: 40%">
	        <span>Данные ФИС</span>
	        <div style="display: flex;">
	          <span>Фамилия(Организация)</span>
	          <div>
	            {{cardAccounting.fisItem.avFirst}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>ГРЗ</span>
	          <div>
	            {{cardAccounting.fisItem.regno}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Марка ТС</span>
	          <div>
	            {{cardAccounting.fisItem.marka}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Модель</span>
	          <div>
	            {{cardAccounting.fisItem.model}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Тип ТС</span>
	          <div>
	            {{cardAccounting.fisItem.typeTcName}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Год выпуска ТС</span>
	          <div>
	            {{cardAccounting.fisItem.yearAvto}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Цвет</span>
	          <div>
	            {{cardAccounting.fisItem.color}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>VIN</span>
	          <div>
	            {{cardAccounting.fisItem.vin}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Номер кузова</span>
	          <div>
	            {{cardAccounting.fisItem.nkuzov}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Номер шасси</span>
	          <div>
	            {{cardAccounting.fisItem.nshasi}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Тип кузова</span>
	          <div>
	            {{cardAccounting.fisItem.typeKuzovName}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Мощность л/с</span>
	          <div>
	            {{cardAccounting.fisItem.powerLs}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Мощность кВт</span>
	          <div>
	            {{cardAccounting.fisItem.powerKwt}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Максимальная масса</span>
	          <div>
	            {{cardAccounting.fisItem.massaDop}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Масса полная</span>
	          <div>
	            {{cardAccounting.fisItem.massaTotal}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Объем двигателя</span>
	          <div>
	            {{cardAccounting.fisItem.vmotorCm3}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Тип двигателя</span>
	          <div>
	            {{cardAccounting.fisItem.typeMotor}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Номер двигателя</span>
	          <div>
	            {{cardAccounting.fisItem.nmotor}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Количество мест</span>
	          <div>
	            {{cardAccounting.fisItem.posadMest}}
	          </div>
	        </div>
	        <div style="display: flex;">
	          <span>Экологический класс</span>
	          <div>
	            {{cardAccounting.fisItem.ecologClass}}
	          </div>
	        </div>
	      </div>
	    </div>
	
	    <div v-if="cardAccounting.loadItems">
	      <div>
	        <div v-for="(item, index) in cardAccounting.loadItems" @click="getLoadHead(item.headId)">
	          <div>{{item.reestrTime | formatDateTime('DD.MM.YYYY HH:mm')}}</div>
	          <div>{{item.operName}}</div>
	          <div>{{item.permitStartDate}}</div>
	          <div>{{item.permitEndDate}}</div>
	        </div>
	      </div>
	      <div v-if="package">
	        {{package}}
	      </div>
	    </div>
	
	    <DatePicker type="date" format="yyyy-MM-dd" v-model="expDate" placeholder="Select expDate"></DatePicker>
	    <button type="button" @click="createExpireCard">Применить</button>
	  </div>-->
	<div class="layout flex-parent flex-parent--column" v-if="cardAccounting">
		<Layout>
			<Layout class="relative">
				<table-poptip :expDate="expDate" :clickFunction="createExpireCard"></table-poptip>
				<Content class="mx12">
					<button type="button" @click="getPrev" class="flex-parent flex-parent--row flex-parent--center-cross">
	            <Icon type="ios-arrow-back" size="45"/>
	            <h2 class="txt-h2 my12">ГРЗ: {{cardAccounting.item.tcRegno}}</h2>
	          </button>
					<Row :gutter="16">
						<Col :xs="{span: 24}" :md="{span: 12}">
						<Row :gutter="16">
							<Col :xs="{span: 24}" :md="{span: 12}">
							<Card class="my12">
								<h3 slot="title" class="txt-h3">Разрешение</h3>
	
	
								<table class='table border--0'>
									<tbody>
										<tr class="bg-green-light color-green-dark">
											<td>Статус</td>
											<td class="txt-bold">Действующее</td>
										</tr>
										<tr class="color-red-dark bg-red-light">
											<td>Дата окончания</td>
											<td class="txt-bold">{{cardAccounting.item.permitEndDate}}</td>
										</tr>
										<tr>
											<td>Срок действия</td>
											<td class="txt-bold">{{cardAccounting.item.permitStartDate + ' - ' + cardAccounting.item.permitEndDate}}</td>
										</tr>
										<tr>
											<td>Дата создания</td>
											<td class="txt-bold">{{cardAccounting.item.createdTime | formatDateTime('DD.MM.YYYY HH:mm')}}</td>
										</tr>
									</tbody>
								</table>
	
							</Card>
							<Card class="my12">
								<h3 slot="title" class="txt-h3">Системные сведения</h3>
								<div class="px12 my12">
									<div class='txt-h5'>Источник</div>
									<p class="txt-bold">{{cardAccounting.item.sourceName}}</p>
								</div>
								<div class="px12 my12">
									<div class='txt-h5'>Основание</div>
									<p class="txt-bold">{{cardAccounting.item.reasonName}}</p>
								</div>
								<div class="px12 my12">
									<div class='txt-h5'>Описание</div>
									<p class="txt-bold">{{cardAccounting.item.descr}}</p>
								</div>
							</Card>
							</Col>
							<Col :xs="{span: 24}" :md="{span: 12}">
							<Card class="my12">
								<h3 slot="title" class="txt-h3">Транспортное средство</h3>
								<table class="table border--0 table--fixed">
									<tbody>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">ГРЗ</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.tcRegno}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Марка ТС</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.brand}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Модель</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.model}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Тип ТС</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.categoryName}}</td>
										</tr>
									</tbody>
								</table>
							</Card>
	
							<Card class="my12">
								<h3 slot="title" class="txt-h3">Владелец</h3>
								<table class="table border--0 table--fixed">
									<tbody>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Фамилия(организация)</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.ownerName}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Адрес</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.ownerAddress}}</td>
										</tr>
										<tr class="txt-bold">
											<td class="border--0 px0 py0 color-gray">Телефон</td>
											<td class="border--0 px0 py0">{{cardAccounting.item.ownerPhone}}</td>
										</tr>
									</tbody>
								</table>
							</Card>
	
	
							</Col>
						</Row>
						</Col>
						<Col :xs="{span: 24}" :md="{span: 6}">
						<Card class="my12">
							<h3 slot="title" class="txt-h3">Данные ФИС</h3>
							<table class="table border--0 table--fixed">
								<tbody>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Фамилия(организация)</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.avFirst !== cardAccounting.fisItem.avFirst ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.avFirst}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.avFirst !== cardAccounting.fisItem.avFirst ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.avFirst}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">ГРЗ</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.regno !== cardAccounting.fisItem.regno ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.regno}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.regno !== cardAccounting.fisItem.regno ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.regno}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Марка ТС</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.marka !== cardAccounting.fisItem.marka ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.marka}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.marka !== cardAccounting.fisItem.marka ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.marka}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Модель</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.model !== cardAccounting.fisItem.model ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.model}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.model !== cardAccounting.fisItem.model ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.model}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Тип ТС</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.typeTcName !== cardAccounting.fisItem.typeTcName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.typeTcName}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.typeTcName !== cardAccounting.fisItem.typeTcName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.typeTcName}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Год выпуска ТС</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.yearAvto !== cardAccounting.fisItem.yearAvto ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.yearAvto}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.yearAvto !== cardAccounting.fisItem.yearAvto ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.yearAvto}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Цвет</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.color !== cardAccounting.fisItem.color ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.color}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.color !== cardAccounting.fisItem.color ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.color}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">VIN</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.vin !== cardAccounting.fisItem.vin ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.vin}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.vin !== cardAccounting.fisItem.vin ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.vin}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Номер кузова</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.nkuzov !== cardAccounting.fisItem.nkuzov ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.nkuzov}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.nkuzov !== cardAccounting.fisItem.nkuzov ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.nkuzov}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Номер шасси</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.nshasi !== cardAccounting.fisItem.nshasi ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.nshasi}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.nshasi !== cardAccounting.fisItem.nshasi ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.nshasi}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Тип кузова</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.typeKuzovName !== cardAccounting.fisItem.typeKuzovName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.typeKuzovName}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.typeKuzovName !== cardAccounting.fisItem.typeKuzovName ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.typeKuzovName}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Мощность л/c</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.powerLs !== cardAccounting.fisItem.powerLs ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.powerLs}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.powerLs !== cardAccounting.fisItem.powerLs ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.powerLs}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Мощность кВт</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.powerKwt !== cardAccounting.fisItem.powerKwt ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.powerKwt}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.powerKwt !== cardAccounting.fisItem.powerKwt ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.powerKwt}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Максимальная масса</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.massaDop !== cardAccounting.fisItem.massaDop ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.massaDop}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.massaDop !== cardAccounting.fisItem.massaDop ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.massaDop}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Масса полная</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.massaTotal !== cardAccounting.fisItem.massaTotal ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.massaTotal}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.massaTotal !== cardAccounting.fisItem.massaTotal ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.massaTotal}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Объем двигателя</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.vmotorCm3 !== cardAccounting.fisItem.vmotorCm3 ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.vmotorCm3 + ' см'}}<sup>3</sup></td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.vmotorCm3 !== cardAccounting.fisItem.vmotorCm3 ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.vmotorCm3 + ' см'}}<sup>3</sup></td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Тип двигателя</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.typeMotor !== cardAccounting.fisItem.typeMotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.typeMotor}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.typeMotor !== cardAccounting.fisItem.typeMotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.typeMotor}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Номер двигателя</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.nmotor !== cardAccounting.fisItem.nmotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.nmotor}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.nmotor !== cardAccounting.fisItem.nmotor ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.nmotor}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Количество мест</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.posadMest !== cardAccounting.fisItem.posadMest ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.posadMest}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.posadMest !== cardAccounting.fisItem.posadMest ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.posadMest}}</td>
									</tr>
									<tr class="txt-bold">
										<td class="border--0 px0 py0 color-gray">Экологический класс</td>
										<td :style="{color: null !== fisLoadData && fisLoadData.ecologClass !== cardAccounting.fisItem.ecologClass ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{cardAccounting.fisItem.ecologClass}}</td>
										<td v-if="fisLoadData" :style="{color: fisLoadData.ecologClass !== cardAccounting.fisItem.ecologClass ? 'red' : '#3f3f3f'}" class="border--0 px0 py0">{{fisLoadData.ecologClass}}</td>
									</tr>
								</tbody>
							</table>
						</Card>
						</Col>
					</Row>
				</Content>
			</Layout>
		</Layout>
		<Footer class="footer py0 px0">
			<h4 class="txt-h4 my12 px24">Связанные пакеты</h4>
			<Content v-if="cardAccounting.loadItems" class="bg-white-light">
				<Row>
					<Col :xs="{span: 24}" :md="{span: 12}">
					<Table ref="selection" :columns="columnsOption" :data="cardAccounting.loadItems" size="small" :show-header="false" @on-row-click="selectPackage" height="250">
					</Table>
					</Col>
					<Col v-if="package" :xs="{span: 24}" :md="{span: 12}">
					<Card class="scroll-auto border--0 unround" style="max-height: 250px">
						<Row>
							<Col :xs="{span: 12}" :md="{span: 12}">
							<b class="txt-bold">{{package.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}</b>
							<table class="table border--0">
								<tbody>
									<tr class="txt-bold">
										<td width="30%" class="border--0 px0 py0 color-gray-light">Основание</td>
										<td width="70%" class="border--0 px0 py0">{{package.reasonName}}</td>
									</tr>
									<tr class="txt-bold">
										<td width="30%" class="border--0 px0 py0 color-gray-light">Источник</td>
										<td width="70%" class="border--0 px0 py0">{{package.sourceName}}</td>
									</tr>
									<tr class="txt-bold">
										<td width="30%" class="border--0 px0 py0 color-gray-light">Исполнитель</td>
										<td width="70%" class="border--0 px0 py0">{{package.createIspName}}</td>
									</tr>
								</tbody>
							</table>
							</Col>
							<Col :xs="{span: 12}" :md="{span: 12}">
							<button type="button" @click="getPackageCard" class="flex-parent flex-parent--row flex-parent--center-cross">
	                    <Icon type="ios-link" :size="30" class="mx12"/>
	                    <b class="text-b txt-underline">{{package.name}}</b>
	                  </button>
							</Col>
						</Row>
					</Card>
					</Col>
				</Row>
			</Content>
		</Footer>
	</div>
</template>

<script>
import * as funcUtils from "../../assets/js/utils/funcUtils";
import TablePoptip from './../verstka/TablePoptip.vue';

export default {
	name: "RegisterCardAccounting",
	components: {
		TablePoptip
	},
	data() {
		return {
			package: null,
			fisLoadData: null,
			expDate: null,
			columnsOption: [{
					title: 'Иконка',
					key: 'icon',
					type: 'html',
					width: '5%'
				},
				{
					title: 'Дата',
					key: 'reestrTime',
					width: '23%'
				},
				{
					title: 'ФИО',
					key: 'operName',
					width: '23%'
				},
				{
					title: 'Время начала действия разрешения',
					key: 'permitStartDate',
					width: '23%'
				},
				{
					title: 'Время окончания действия разрешения',
					key: 'permitEndDate',
					width: '23%'
				},
			],
		};
	},
	beforeCreate: function() {
		let vm = this;
		(async () => {
			try {
				let wid = sessionStorage.getItem('wid');
				let componentsRoute = funcUtils.getFromSessionStorage(wid);
				let currentComponent = await vm.$store.dispatch('getCurrentComponent', {
					componentArr: componentsRoute
				});
				let cid = currentComponent.cid;
				vm.$store.dispatch('registerCardAccountingSetCid', cid);
				let prepareParams = {
					cid: cid
				};
				if (funcUtils.isNotEmpty(vm.$route.params.id) && funcUtils.isNotEmpty(vm.$route.params.sourceId)) {
					prepareParams.method = 'getData';
					prepareParams.params = {
						'id': vm.$route.params.id,
						'sourceId': vm.$route.params.sourceId
					};
				}

				let eventResponse = await vm.$store.dispatch('prepareData', prepareParams);
				vm.$store.dispatch('fillModule', { 'event': eventResponse });
			} catch (e) {
				alert(e.message);
			}
		})();

		this.$store.watch(this.$store.getters.registerCardAccountingGetCommand, () => {
			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {});
					vm.$store.dispatch('fillModule', { 'event': eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		});
	},
	destroyed() {
		this.$store.dispatch('registerCardAccountingSetCid', null);
		this.$store.dispatch('registerCardAccountingSetData', {
			data: null
		});
	},
	computed: {
		cardAccounting() {
			let res;
			let data = this.$store.state.registerCardAccounting.data;
			if (data) {
				data.loadItems.sort((a, b) => {
					return b.reestrTime - a.reestrTime;
				});

				data.loadItems.forEach((item) => {
					item.icon = '<i class="ivu-icon ivu-icon-ios-eye" style="font-size: 30px;"></i>';
					item.operName = funcUtils.lookupValue('operTipes', item.operType).label;
					item.reestrTime = funcUtils.parseDateTime(item.reestrTime, 'DD.MM.YYYY HH:mm');
					item.permitStartDate = funcUtils.parseDateTime(item.permitStartDate, 'DD.MM.YYYY HH:mm');
					item.permitEndDate = funcUtils.parseDateTime(item.permitEndDate, 'DD.MM.YYYY HH:mm');
				});
				res = data;
			}
			return res;
		}
	},
	methods: {
		createExpireCard() {
			if (funcUtils.isNull(this.expDate)) return;

			let vm = this;

			(async () => {
				try {
					await vm.$store.dispatch('prepareData', {
						method: 'createExpireReestr',
						params: {
							expDate: this.expDate
						}
					});

					let eventResponse = await vm.$store.dispatch('prepareData', {});

					vm.$store.dispatch('fillModule', { 'event': eventResponse });
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		selectPackage(row) {
			this.getLoadHead(row);
			this.getFisLoadData(row);
		},
		getLoadHead(row) {
			let vm = this;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getLoadHead',
						params: {
							headId: row.headId
						}
					});
					let dataJson = JSON.parse(eventResponse.response);
					vm.package = dataJson.data;
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getFisLoadData(row) {
			let vm = this;

			(async () => {
				try {
					let eventResponse = await vm.$store.dispatch('prepareData', {
						method: 'getFisLoadData',
						params: {
							tsId: row.tcId
						}
					});
					let dataJson = JSON.parse(eventResponse.response);
					vm.fisLoadData = dataJson.data;
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getPrev: function() {
			let vm = this;
			let path = funcUtils.getFromSessionStorage('path');
			(async () => {
				try {
					let currentPage = await vm.$store.dispatch('getCurrentPage', path);
					if (currentPage.params.routeName === vm.$store.state.registerReestr.routeName) {
						vm.$root.getRegisterReestr();
					} else {
						await vm.$store.dispatch('getPrevComponent');
						vm.$store.dispatch('getPrevPage', {
							'vm': vm,
							'pageName': currentPage.params.routeName
						});
					}
				} catch (e) {
					alert(e.message);
				}
			})();
		},
		getPackageCard() {
			let params = {
				'routeName': this.$store.state.registerCardAccounting.routeName,
				'headId': this.package.id
			};

			let vm = this;
			(async () => {
				try {
					await vm.$store.dispatch('getNextComponent', {
						'beanName': vm.$store.state.packageCard.bean
					});
					vm.$store.dispatch('getNextPage', {
						'vm': vm,
						'pageName': vm.$store.state.packageCard.routeName,
						'params': params
					});
				} catch (e) {
					alert(e.message);
				}
			})();
		},
	}
}
</script>

<style lang="scss">
.layout {
	min-height: 100vh;
}

.footer {
	min-height: 300px;
}
</style>
