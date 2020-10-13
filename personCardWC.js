const personCardTemplate = document.createElement('template');

personCardTemplate.innerHTML = `
	<link rel="stylesheet" href="personCardWC.css" />
	<div class="wrapper">
		<section class="contentSection">
			<div class="front">
				<img
					class="profileImg"
					src="https://phareps.org/wp-content/uploads/2020/09/GeraldineDarpoux.png"
				/>
			</div>
			<div class="back">
				<article>
					<slot name="content" />
				</article>
			</div>
		</section>
		<section class="controlSection">
			<p class="nameLastname">
				<slot name="name" />
			</p>
			<p class="readMoreBtn">Read more</p>
			<p class="closeBtn">Close</p>
		</section>
	</div>
`;

class PersonCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(personCardTemplate.content.cloneNode(true));
	}
	connectedCallback() {
		const wrapper = this.shadowRoot.querySelector('.wrapper');
		const contentSection = this.shadowRoot.querySelector('.contentSection');
		const profileImg = this.shadowRoot.querySelector('.profileImg');
		const readMoreBtn = this.shadowRoot.querySelector('.readMoreBtn');
		const closeBtn = this.shadowRoot.querySelector('.closeBtn');
		const innerViewPortWidth = window.innerWidth;
		readMoreBtn.addEventListener('click', () => {
			profileImg.setAttribute('style', 'opacity: 0');
			contentSection.setAttribute('style', 'transform: rotateX(180deg)');
			if (innerViewPortWidth > 520) {
				wrapper.setAttribute('style', 'width: 500px');
			} else {
				wrapper.setAttribute('style', 'width: 300px');
			}
			readMoreBtn.setAttribute('style', 'display: none');
			closeBtn.setAttribute('style', 'display: block');
		});
		closeBtn.addEventListener('click', () => {
			profileImg.setAttribute('style', 'opacity: 1');
			contentSection.setAttribute('style', 'transform: rotateX(0deg)');
			wrapper.setAttribute('style', 'width: 180px');
			closeBtn.setAttribute('style', 'display: none');
			readMoreBtn.setAttribute('style', 'display: block');
		});

		// const wrapper = this.shadowRoot.getElementById('wrapper');
		// const personCard = this.shadowRoot.getElementById('personCard');
		// // const front = this.shadowRoot.getElementById('front');
		// const readMore = this.shadowRoot.getElementById('readMore');
		// // const back = this.shadowRoot.getElementById('back');
		// const closeBtn = this.shadowRoot.getElementById('closeBtn');
		// const profileImg = this.shadowRoot.getElementById('profileImg');
		// readMore.addEventListener('click', () => {
		// 	profileImg.setAttribute('style', 'opacity: 0');
		// 	personCard.setAttribute('style', 'transform: rotateX(180deg)');
		// 	personCard.setAttribute('style', '-webkit-transform: rotateX(180deg)');
		// 	const intViewportWidth = window.innerWidth;
		// 	console.log(intViewportWidth);
		// 	if (intViewportWidth > 520) {
		// 		console.log('More than 520px');
		// 		wrapper.setAttribute('style', 'width: 500px');
		// 	} else {
		// 		console.log('Less than 520px');
		// 		wrapper.setAttribute('style', 'width: 300px');
		// 	}
		// 	// console.log(window.innerWidth);
		// 	// wrapper.setAttribute('style', 'width: 500px');
		// });
		// closeBtn.addEventListener('click', () => {
		// 	profileImg.setAttribute('style', 'opacity: 1');
		// 	personCard.setAttribute('style', 'transform: rotateX(0deg)');
		// 	wrapper.setAttribute('style', 'width: 174px');
		// 	wrapper.setAttribute('style', 'height: 300px');
		// });
	}
}

window.customElements.define('person-card', PersonCard);
