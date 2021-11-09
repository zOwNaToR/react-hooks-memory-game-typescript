import React, { useEffect, useRef } from 'react';

const useEffectSkipFirstRender = (
	callback: React.EffectCallback,
	dataArr: React.DependencyList
) => {
	const isInitialRender = useRef(true);

	useEffect(() => {
		// Skip First execution of useEffect
		if (isInitialRender.current) {
			isInitialRender.current = false; // Set it to false so subsequent changes of dependency arr will make useEffect to execute
			return;
		}

		return callback();
	}, dataArr);
};

export default useEffectSkipFirstRender;
