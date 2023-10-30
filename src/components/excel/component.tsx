import * as React from 'react'

export const Excel = ({data, headers}: {data: any, headers: any}) => {
	
	const transformed_data = []
	for ( let i = 0; i < data.time.length; i++){
		transformed_data.push([data.time[i], data.pm10[i], data.pm2_5[i]])
	}

    return (
		<table>
			<thead>
				<tr>
					{headers.map((v: string, idx: number) => (
						<td key={idx}>{v}</td>
					))}
				</tr>
			</thead>
			<tbody>
					{transformed_data.map((row, idx) => (
						<tr key={idx}>
							{row.map((cell, idx) => (
								<td key={idx}>{cell}</td>
							))}
						</tr>
					))}
			</tbody>
		</table>
    )
}