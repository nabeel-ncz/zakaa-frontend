export default function Applications() {
    return (
        <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
            <table className="w-full min-w-max table-auto">
                <thead className="font-normal">
                    <tr className="border-b border-gray-200">
                        <th className="font-semibold p-4 text-left border-r">User</th>
                        <th className="font-semibold p-4 text-left border-r">Phone</th>
                        <th className="font-semibold p-4 text-left border-r">Profession</th>
                        <th className="font-semibold p-4 text-left border-r">Description</th>
                        <th className="font-semibold p-4 text-left border-r">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200">
                        <td className="font-normal p-4 text-left border-r">user@gmail.com</td>
                        <td className="font-normal p-4 text-left border-r">83892902</td>
                        <td className="font-normal p-4 text-left border-r">developer</td>
                        <td className="font-normal p-4 text-left border-r">Lorem ipsum dolor sit amet consectetur adipisicing elit.</td>
                        <td className="font-normal p-4 text-left border-r">Accepted!</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}