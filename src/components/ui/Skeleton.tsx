export default function Skeleton({ width, height }: {width: string; height: string;}) {
    return (
        <div
            className={`bg-gray-300 animate-pulse rounded`}
            style={{ width, height }}
        ></div>
    );
};
