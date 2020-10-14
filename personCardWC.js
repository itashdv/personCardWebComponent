const personCardTemplate = document.createElement('template');

personCardTemplate.innerHTML = `
	<link rel="stylesheet" href="personCardWC.css" />
	<div class="wrapper">
		<section class="contentSection">
			<div class="front">
				<img
					class="profileImg"
					src=""
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
		if (this.hasAttribute('image')) {
			const imgSrc = this.getAttribute('image');
			profileImg.setAttribute('src', imgSrc);
		}
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
	}
}

window.customElements.define('person-card', PersonCard);
