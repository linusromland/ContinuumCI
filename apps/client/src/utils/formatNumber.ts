function formatNumber(number: number, decimals = 2) {
	if (!number) return '0';
	return number.toLocaleString(undefined, {
		minimumFractionDigits: 0,
		maximumFractionDigits: decimals
	});
}

export { formatNumber };
