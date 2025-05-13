interface DumpProps<T> {
	className?: string;
	data: T;
	indent?: number;
}

const Dump = <T,>({ className = "p-4 bg-gray-50 text-sm", data, indent = 4 }: DumpProps<T>) => {
	const formattedData = JSON.stringify(data, null, indent);

	return <span className={className}>{formattedData}</span>;
};

export default Dump;
