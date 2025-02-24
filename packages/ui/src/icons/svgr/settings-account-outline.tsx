import * as React from "react";
import { SVGProps, Ref, forwardRef } from "react";
const SvgSettingsAccountOutline = (
	props: SVGProps<SVGSVGElement>,
	ref: Ref<SVGSVGElement>
) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		fill="none"
		viewBox="0 0 24 24"
		ref={ref}
		{...props}
	>
		<path
			fill="#fff"
			d="M13.497 12c.819 0 1.515-.287 2.09-.86a2.837 2.837 0 0 0 .863-2.087c0-.819-.287-1.516-.86-2.09a2.837 2.837 0 0 0-2.087-.863c-.819 0-1.515.287-2.09.86a2.837 2.837 0 0 0-.863 2.087c0 .819.286 1.515.86 2.09a2.837 2.837 0 0 0 2.087.863ZM6.5 17.525a9.435 9.435 0 0 1 3.1-2.575 8.326 8.326 0 0 1 3.9-.95c1.383 0 2.683.317 3.9.95a9.435 9.435 0 0 1 3.1 2.575V3.5h-14v14.025ZM6.5 19c-.412 0-.766-.147-1.06-.44A1.445 1.445 0 0 1 5 17.5v-14c0-.413.147-.766.44-1.06.294-.293.647-.44 1.06-.44h14c.413 0 .766.147 1.06.44.293.294.44.647.44 1.06v14c0 .413-.147.766-.44 1.06-.294.293-.647.44-1.06.44h-14Zm-3 3c-.413 0-.766-.147-1.06-.44A1.445 1.445 0 0 1 2 20.5V6.25h1.5V20.5h14.25V22H3.5Zm10-11.5c-.4 0-.742-.142-1.025-.425a1.397 1.397 0 0 1-.425-1.025c0-.4.142-.742.425-1.025A1.397 1.397 0 0 1 13.5 7.6c.4 0 .742.142 1.025.425.283.283.425.625.425 1.025 0 .4-.142.742-.425 1.025a1.397 1.397 0 0 1-1.025.425Zm-4.675 7h9.35a6.051 6.051 0 0 0-2.113-1.488A6.514 6.514 0 0 0 13.5 15.5c-.9 0-1.754.17-2.563.512A6.051 6.051 0 0 0 8.825 17.5Z"
		/>
	</svg>
);
const ForwardRef = forwardRef(SvgSettingsAccountOutline);
export default ForwardRef;
