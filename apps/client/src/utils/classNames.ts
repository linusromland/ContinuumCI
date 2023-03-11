function classNames(...styles: string[]) {
	return styles.filter(Boolean).join(' ');
}

export default classNames;
