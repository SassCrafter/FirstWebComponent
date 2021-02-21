

class Tooltip extends HTMLElement {
	constructor() {
		super();
		this.isOpen = false;
		this.attachShadow({mode: 'open'});
		this.shadowRoot.innerHTML = `

			<style>

			:host {
				display: inline-block;
			}

			::slotted(.tooltip-icon) {
				text-align: center;
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 80%;
			}

			.tooltip-container {
				position: relative;
			}

			.open-tooltip,
			.close-tooltip {
				display: inline-block;
				text-align: center;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				color: var(--tooltip-color, #333);
				background-color: var(--tooltip-bg, #eee);
				cursor: pointer;

			}

			.close-tooltip {
				display: none;
			}

			.tooltip-text {
				min-width: 200px;
				position: absolute;
				top: 125%;
				background-color: var(--tooltip-text-bg,#333);
				color: var(--tooltip-color, #fff);
				padding: 10px;
				border-radius: 5px;
				text-align: center;
				transform: scale(0);
				transform-origin: left center;
				transition: transform 300ms linear;

			}


			</style>

			<div class="tooltip-container">
				<span class="open-tooltip">
					<slot name="open-icon">&#10071;</slot>
				</span>
				<span class="close-tooltip">
					<slot name="close-icon">&#10006;</slot>
				</span>
				<div class="tooltip-text">
					<slot name="text">Tooltip text</slot>
				</div>
			</div>
		`;
	}


	connectedCallback() {
		this.openTooltipEl = this.shadowRoot.querySelector('.open-tooltip');
		this.closeTooltipEl = this.shadowRoot.querySelector('.close-tooltip');
		this.openTooltipEl.addEventListener('click', this.toggleTooltip.bind(this));
		this.closeTooltipEl.addEventListener('click', this.toggleTooltip.bind(this));
	}

	toggleTooltip() {
		this.isOpen = !this.isOpen;
		this.openTooltipEl.style.display = this.isOpen ? 'none' : 'flex';
		this.closeTooltipEl.style.display = this.isOpen ? 'flex' : 'none';
		this.tooltipTextEl = this.shadowRoot.querySelector('.tooltip-text');
		this.tooltipTextEl.style.transform = this.isOpen ? 'scale(1)' : 'scale(0)';
	}
}

customElements.define('sc-tooltip', Tooltip);