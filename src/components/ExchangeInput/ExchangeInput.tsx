import { InputNumber, Select, Skeleton, Spin } from 'antd'
import { FC, memo, useMemo, useState } from 'react'

import { Crypto, CryptoType } from 'types/Crypto'

import { CryptoSelectItem } from '@components/CryptoSelectItem'

import styles from './ExchangeInput.module.scss'

interface ExchangeInputProps {
	skeletonLoading: boolean
	selectOptions: Crypto[]
	cryptoType: CryptoType
	onSelectCrypto: (crypto: Crypto, cryptoType: CryptoType) => void
	onInputValueChange: (value: number, cryptoType: CryptoType) => void
	inputLoading?: boolean
	inputValue?: number
	selectedCoin?: Crypto
}

export const ExchangeInput: FC<ExchangeInputProps> = memo(props => {
	const {
		selectedCoin,
		selectOptions,
		cryptoType,
		inputValue,
		skeletonLoading,
		inputLoading,
		onInputValueChange,
		onSelectCrypto
	} = props

	const selectOptionsMemo = useMemo(() => selectOptions, [selectOptions])

	const [error, setError] = useState<string | null>(null)

	const onChange = (value: number | null) => {
		if (value && value < 0) {
			setError('Value must be greater than 0')
		} else {
			setError(null)
			onInputValueChange(value || 0, cryptoType)
		}
	}

	const onFilterOptions = (input: string, option?: Crypto) =>
		Boolean(
			option?.name?.toLocaleLowerCase()?.includes(input?.toLocaleLowerCase()) ||
				option?.symbol
					?.toLocaleLowerCase()
					?.includes(input?.toLocaleLowerCase())
		)

	return (
		<div className={styles.exchangeInputWrapper}>
			<p>{cryptoType === 'sourceCrypto' ? 'You Send' : 'You Get'}</p>

			{skeletonLoading ? (
				<Skeleton.Input active block size='large' />
			) : (
				<InputNumber
					size='large'
					status={error ? 'error' : undefined}
					controls={false}
					precision={4}
					value={inputValue}
					disabled={inputLoading}
					addonBefore={inputLoading ? <Spin size='small' /> : null}
					addonAfter={
						<Select
							showSearch
							value={selectedCoin?.id}
							style={{ width: 100 }}
							fieldNames={{ label: 'symbol', value: 'id' }}
							options={selectOptionsMemo}
							optionRender={({ data }) => (
								<CryptoSelectItem name={data.name} symbol={data.symbol} />
							)}
							filterOption={onFilterOptions}
							onChange={(_, option) =>
								onSelectCrypto(option as Crypto, cryptoType)
							}
						/>
					}
					onChange={onChange}
				/>
			)}
			{error ? <div className={styles.error}>{error}</div> : null}
		</div>
	)
})
