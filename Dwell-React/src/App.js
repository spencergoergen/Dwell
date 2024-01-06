import React, { useRef, useState } from 'react';
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.css";

mapboxgl.accessToken = "pk.eyJ1IjoibWNtZWRsZXkiLCJhIjoiY2wwN2R5Nm1uMDAyMjNicDdvNzA3azR2cyJ9.a-ONwoxIr7YQ9LXlbKxcEw";

const MichiganCountiesMap = () => {
  // Define states here if needed using useState
  	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-83.732124);
	const [lat, setLat] = useState(42.279594);
	const [zoom, setZoom] = useState(11);

  // React useEffect for initializing the map
  React.useEffect(() => {
	if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  // JSX structure for your component
  return (
	<div className="flex flex-col h-full">
		<div id="title-row" className="bg-white flex gap-2.5 p-2.5">
			<span className="grow font-bold font-sans text-black text-[35px]">Dwell</span>
			<span className="self-center font-bold font-sans text-black text-[18px] ml-auto">Advertise</span>
			<div className="self-center h-[40px] w-[40px] bg-[#3c829e] rounded-[50%] flex justify-center items-center text-white text-[20px] font-bold">SG</div>		
		</div>
		<div id="button-row" className="bg-[#f0f0f0] flex justify-start items-center gap-2.5 p-2.5">
			<div className="search-input-container" id="searchInput">
				<input className="search-input" type="text" id="searchField" placeholder="Search by City, ZIP, Address..." />
			</div>
			<div id="type-dropdown-container" className="dropdown">
				<div tabIndex="0" role="button" className="btn m-1">Type</div>
				<ul tabIndex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
					<li>Option 1</li>
					<li>Option 2</li>
					<li>Option 3</li>
				</ul>
			</div>
			<div className="price-input">
				<button className="button" id="priceButton">Price v</button>
				<div className="price-content" id="priceContent">
					<input type="text" placeholder="Min" id="minPrice" />
					<input type="text" placeholder="Max" id="maxPrice" />
				</div>
			</div>
			<div className="dropdown">
				<button className="button">Downpayment v</button>
				<div className="dropdown-content">
					<div>Option 1</div>
					<div>Option 2</div>
					<div>Option 3</div>
				</div>
			</div>
			<div className="dropdown">
				<button className="button">School District v</button>
				<div className="dropdown-content">
					<div>Option 1</div>
					<div>Option 2</div>
					<div>Option 3</div>
				</div>
			</div>
			<div className="dropdown">
				<button className="button">Loan v</button>
				<div className="dropdown-content">
					<div>Option 1</div>
					<div>Option 2</div>
					<div>Option 3</div>
				</div>
			</div>
			<div className="dropdown">
				<button className="button">Interest Rate v</button>
				<div className="dropdown-content">
					<div>Option 1</div>
					<div>Option 2</div>
					<div>Option 3</div>
				</div>
			</div>
			<div className="button" id="resetButton">Reset Map</div>
		</div>
		<div className="grow">
			<div ref={mapContainer} className="h-full"></div>
		</div>
		<div id="slider-top" className="slider-top">Estimated Home Value: $500,000</div>
		<div id="slider-container">
			<input type="range" min="0" max="1000000" step="5000" id="real-slider" />
		</div>
		<div id="bottom-text" className="bottom-text">Use slider; Re-select area to update</div>
		<script src="scripts.js"></script>
	</div>
  );
};

export default MichiganCountiesMap;