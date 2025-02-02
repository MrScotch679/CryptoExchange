import { FC, memo } from 'react'

import styles from './CryptoSelectItem.module.scss'

interface CryptoSelectItemProps {
	name: string
	symbol: string
}

export const CryptoSelectItem: FC<CryptoSelectItemProps> = memo(props => {
	const { name, symbol } = props

	return (
		<div className={styles.cryptoItemWrapper}>
			<p className={styles.cryptoSymbol}>{symbol}</p>
			<p className={styles.cryptoName}>{name}</p>
		</div>
	)
})
