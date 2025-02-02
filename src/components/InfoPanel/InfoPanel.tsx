import SwapIcon from '/swap-icon.svg'
import { Button, Skeleton } from 'antd'
import { FC, memo } from 'react'

import styles from './InfoPanel.module.scss'

interface InfoPanelProps {
	skeletonLoading: boolean
	ratePerOneSourceCrypto: number
	onCryptoSwap: () => void
	sourceSymbol?: string
	targetSymbol?: string
}

export const InfoPanel: FC<InfoPanelProps> = memo(props => {
	const {
		skeletonLoading,
		ratePerOneSourceCrypto,
		sourceSymbol,
		targetSymbol,
		onCryptoSwap
	} = props

	return (
		<>
			{skeletonLoading ? (
				<Skeleton.Button active block />
			) : (
				<div className={styles.exchangeRateWrapper}>
					<p>{`Estimated rate: 1 ${sourceSymbol} ~ ${ratePerOneSourceCrypto} ${targetSymbol}`}</p>

					<Button
						color='default'
						variant='filled'
						icon={<img src={SwapIcon} alt='Icon' width={16} />}
						onClick={onCryptoSwap}
					/>
				</div>
			)}
		</>
	)
})
