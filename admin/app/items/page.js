'use client'

import AppSidebar from '@/components/appSidebar'
import FullScreenLoader from '@/components/loader'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import axios from 'axios'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import {
	Plus,
	Search,
	Loader2,
	CircleX,
	X,
	Image,
	Trash2,
	SquarePen,
	Check,
	Languages,
} from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'
import { Toggle } from '@/components/ui/toggle'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'

export default function ItemsPage() {
	const [url, setUrl] = useState('')
	const [spu, setSpu] = useState(0)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [images, setImages] = useState([])
	const [logo, setLogo] = useState('')
	const [cats, setCats] = useState([])
	const [cat, setCat] = useState('')
	const [edit1, setEdit1] = useState(false)
	const [supCat, setSupCat] = useState('')
	const [edit2, setEdit2] = useState(false)
	const [supSupCat, setSupSupCat] = useState('')
	const [edit3, setEdit3] = useState(false)
	const [params, setParams] = useState([])
	const [brand, setBrand] = useState({})
	const [sizes, setSizes] = useState([])
	const [article, setArticle] = useState('')
	const [dialogOpen, setDialogOpen] = useState(false)
	const [translate, setTranslate] = useState(false)

	const [link, setLink] = useState('')
	const [loading, setLoading] = useState(false)

	const session = useSession()
	const { status } = session
	if (status === 'unauthenticated') {
		redirect('login')
	}

	async function translateClient(text) {
		const res = await fetch('/api/translate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text }),
		})

		const data = await res.json()
		return data.translatedText
	}

	async function translateParams(params) {
		const translated = await Promise.all(
			params.map(async param => {
				const keyRes = await fetch('/api/translate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ text: param.key }),
				})
				const valueRes = await fetch('/api/translate', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ text: param.value }),
				})

				const keyData = await keyRes.json()
				const valueData = await valueRes.json()

				return {
					key: keyData.translatedText,
					value: valueData.translatedText,
				}
			})
		)

		return translated
	}

	const handleValueChange = (index, newValue) => {
		setParams(prevParams =>
			prevParams.map((param, i) =>
				i === index ? { ...param, value: newValue } : param
			)
		)
	}

	const handleKeyChange = (index, newValue) => {
		setParams(prevParams =>
			prevParams.map((param, i) =>
				i === index ? { ...param, key: newValue } : param
			)
		)
	}

	const handleRemove = index => {
		setParams(prev => prev.filter((_, i) => i !== index))
	}

	const getTranslate = async text => {
		try {
			const { data } = await axios.get('/api/translate', {
				params: {
					text,
				},
			})
			return data
		} catch (error) {
			console.log(error)
		}
	}

	const getCats = async () => {
		await fetch('/api/categories', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ catId: cats[0].id }),
		}).then(res =>
			res.json().then(cats => {
				setCat(cats[0].name),
					setSupCat(cats[1].name),
					setSupSupCat(cats[2].name),
					setCats(cats)
			})
		)
	}

	const getID = async url => {
		setLoading(true)
		try {
			const res = await axios.get('/api/getSpuId', {
				params: {
					link: url,
				},
			})
			const res2 = await axios.get('/api/getProductDetail', {
				params: {
					id: res.data.spuId,
				},
			})
			setUrl(res2.data.shareInfo.shareLinkUrl)
			setSpu(res2.data.detail.spuId)
			if (translate) {
				const ruTitle = await translateClient(res2.data.detail.title)
				setTitle(ruTitle)
				const ruParams = await translateParams(res2.data.basicParam.basicList)
				setParams(ruParams)
			} else {
				setTitle(res2.data.detail.title)
				setParams(
					res2.data.basicParam.basicList.map(e => {
						return { key: e.key, value: e.value }
					})
				)
			}
			setDesc(res2.data.detail.desc)
			setImages(
				res2.data.image.spuImage.images.map(e => {
					return e.url
				})
			)
			setLogo(res2.data.detail.logoUrl)

			await fetch('/api/categories', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ catId: res2.data.detail.categoryId }),
			}).then(res =>
				res.json().then(cats => {
					setCat(cats[0].name),
						setSupCat(cats[1].name),
						setSupSupCat(cats[2].name),
						setCats(cats)
				})
			)

			setBrand({
				brandLogo: res2.data.brandRootInfo.brandItemList[0].brandLogo,
				brandName: res2.data.brandRootInfo.brandItemList[0].brandName,
				brandId: res2.data.brandRootInfo.brandItemList[0].brandId,
			})
			setSizes(res2.data.sizeDto.sizeInfo.sizeTemplate.list)
			setArticle(res2.data.detail.articleNumber)
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!edit1 && !edit2 && !edit3 && url && title && desc) {
			try {
				const res = await fetch('/api/items', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						url,
						spuId: spu,
						title,
						description: desc,
						imagesUrl: images,
						logoUrl: logo,
						basicParam: params,
						category: cats[0].id,
						brandRootInfo: brand,
						sizeDto: sizes,
						articleNumber: article,
					}),
				})

				if (res.ok) {
					setDialogOpen(false)
					toast.success('Запись сохранена')
					setUrl('')
					setSpu(0)
					setTitle('')
					setDesc('')
					setImages([])
					setLogo('')
					setCats([])
					setCat('')
					setEdit1(false)
					setEdit2(false)
					setEdit3(false)
					setSupCat('')
					setSupSupCat('')
					setParams([])
					setBrand({})
					setSizes([])
					setArticle('')
				}
			} catch (error) {
				console.log(error)
			}
		} else toast.error('Завершите редактирование')
	}

	return status === 'loading' ? (
		<FullScreenLoader />
	) : (
		<div className='pl-[22rem] w-screen pr-15'>
			<AppSidebar />
			<h1 className='my-7 text-2xl font-semibold'>Товары</h1>
			<Card>
				<CardHeader>
					<div className='flex justify-between items-center'>
						<div className='flex items-center w-[40%] gap-3'>
							<Search />
							<Input placeholder='Поиск...' />
						</div>

						<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
							<DialogTrigger asChild>
								<Button>
									Добавить <Plus />
								</Button>
							</DialogTrigger>
							<DialogContent className='!max-w-fit'>
								<form onSubmit={e => handleSubmit(e)}>
									<DialogHeader className='mb-5'>
										<DialogTitle>Новый товар</DialogTitle>
										<DialogDescription>
											Вставьте ссылку на товар из приложения
										</DialogDescription>
										<div className='flex items-center gap-3'>
											<Toggle
												pressed={translate}
												onPressedChange={setTranslate}
											>
												<Languages />
											</Toggle>
											<Input
												className='flex-grow'
												placeholder='https://dw4.co/...'
												onChange={e => setLink(e.target.value.trim())}
												value={link}
											/>
											<Button
												variant='secondary'
												className='self-end'
												onClick={() => getID(link)}
												disabled={loading || !link}
												type='button'
											>
												{loading ? (
													<Loader2 className='animate-spin' />
												) : (
													<Search />
												)}
												Найти
											</Button>
										</div>
									</DialogHeader>
									<ScrollArea className='rounded-md border h-[60vh] '>
										<div className='w-[50vw] flex flex-col gap-4 m-5'>
											<div className='flex items-center gap-6'>
												{logo ? (
													<img
														src={logo}
														className='h-15 select-none drag-none rounded-md overflow-hidden'
													/>
												) : (
													<Image size={36} />
												)}

												<div className='flex-grow'>
													<Label htmlFor='Title' className='mb-1 ml-1'>
														Название
													</Label>
													<Input
														id='Title'
														value={title}
														onChange={e => setTitle(e.target.value)}
													/>
												</div>
											</div>
											<div className='flex items-center gap-2'>
												<div className='flex items-center gap-1 flex-grow'>
													<ContextMenu>
														<ContextMenuTrigger asChild>
															<Input
																disabled={!edit3}
																value={supSupCat}
																onChange={e => setSupSupCat(e.target.value)}
															/>
														</ContextMenuTrigger>
														<ContextMenuContent>
															<ContextMenuItem
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		cats[2]?.zh
																	),
																		toast.success('Скопировано')
																}}
															>
																Копировать перевод
															</ContextMenuItem>
														</ContextMenuContent>
													</ContextMenu>

													{edit3 ? (
														<>
															<Button
																size='icon'
																type='button'
																disabled={
																	!supSupCat || supSupCat === cats[2].name
																}
																onClick={async () => {
																	await fetch('/api/categories', {
																		method: 'PUT',
																		headers: {
																			'Content-Type': 'application/json',
																		},
																		body: JSON.stringify({
																			catId: cats[2].id,
																			name: supSupCat,
																		}),
																	}),
																		setEdit3(false),
																		getCats()
																}}
															>
																<Check />
															</Button>
															<Button
																size='icon'
																type='button'
																variant='secondary'
																onClick={() => {
																	setEdit3(false), setSupSupCat(cats[2].name)
																}}
															>
																<X />
															</Button>
														</>
													) : (
														<Button
															size='icon'
															type='button'
															disabled={!supSupCat}
															onClick={() => setEdit3(true)}
														>
															<SquarePen />
														</Button>
													)}
												</div>
												<div className='flex items-center gap-1 flex-grow'>
													<ContextMenu>
														<ContextMenuTrigger asChild>
															<Input
																disabled={!edit2}
																value={supCat}
																onChange={e => setSupCat(e.target.value)}
															/>
														</ContextMenuTrigger>
														<ContextMenuContent>
															<ContextMenuItem
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		cats[1]?.zh
																	),
																		toast.success('Скопировано')
																}}
															>
																Копировать перевод
															</ContextMenuItem>
														</ContextMenuContent>
													</ContextMenu>

													{edit2 ? (
														<>
															<Button
																size='icon'
																type='button'
																disabled={!supCat || supCat === cats[1].name}
																onClick={async () => {
																	await fetch('/api/categories', {
																		method: 'PUT',
																		headers: {
																			'Content-Type': 'application/json',
																		},
																		body: JSON.stringify({
																			catId: cats[1].id,
																			name: supCat,
																		}),
																	}),
																		setEdit2(false),
																		getCats()
																}}
															>
																<Check />
															</Button>
															<Button
																size='icon'
																type='button'
																variant='secondary'
																onClick={() => {
																	setEdit2(false), setSupCat(cats[1].name)
																}}
															>
																<X />
															</Button>
														</>
													) : (
														<Button
															size='icon'
															type='button'
															disabled={!supCat}
															onClick={() => setEdit2(true)}
														>
															<SquarePen />
														</Button>
													)}
												</div>
												<div className='flex items-center gap-1 flex-grow'>
													<ContextMenu>
														<ContextMenuTrigger asChild>
															<Input
																disabled={!edit1}
																value={cat}
																onChange={e => setCat(e.target.value)}
															/>
														</ContextMenuTrigger>
														<ContextMenuContent>
															<ContextMenuItem
																onClick={async () => {
																	await navigator.clipboard.writeText(
																		cats[0]?.zh
																	),
																		toast.success('Скопировано')
																}}
															>
																Копировать перевод
															</ContextMenuItem>
														</ContextMenuContent>
													</ContextMenu>

													{edit1 ? (
														<>
															<Button
																size='icon'
																type='button'
																disabled={!cat || cat === cats[0].name}
																onClick={async () => {
																	await fetch('/api/categories', {
																		method: 'PUT',
																		headers: {
																			'Content-Type': 'application/json',
																		},
																		body: JSON.stringify({
																			catId: cats[0].id,
																			name: cat,
																		}),
																	}),
																		setEdit1(false),
																		getCats()
																}}
															>
																<Check />
															</Button>
															<Button
																size='icon'
																type='button'
																variant='secondary'
																onClick={() => {
																	setEdit1(false), setCat(cats[0].name)
																}}
															>
																<X />
															</Button>
														</>
													) : (
														<Button
															size='icon'
															type='button'
															disabled={!cat}
															onClick={() => setEdit1(true)}
														>
															<SquarePen />
														</Button>
													)}
												</div>
											</div>
											<ScrollArea className='w-full h-fit whitespace-nowrap rounded-md border'>
												<div className='flex w-max space-x-4 p-4 h-44'>
													{images.map((image, index) => (
														<div key={index} className=' relative'>
															<img src={image} className='rounded-md h-full' />
															<CircleX
																color='#1d293d'
																className=' absolute top-1 right-1 cursor-pointer'
																onClick={() =>
																	setImages([
																		...images.slice(0, index),
																		...images.slice(index + 1),
																	])
																}
															/>
														</div>
													))}
												</div>
												<ScrollBar orientation='horizontal' />
											</ScrollArea>
											<div>
												<Label htmlFor='desc' className='mb-1 ml-1'>
													Описание
												</Label>
												<Textarea
													id='desc'
													value={desc}
													onChange={e => setDesc(e.target.value)}
													className='resize-none h-15'
												/>
											</div>
											{params.map((param, index) => (
												<div key={index} className='flex items-center gap-8'>
													<Input
														value={param.key}
														onChange={e =>
															handleKeyChange(index, e.target.value)
														}
													/>
													<Input
														value={param.value}
														onChange={e =>
															handleValueChange(index, e.target.value)
														}
													/>
													<Button
														size='icon'
														variant='secondary'
														type='button'
														onClick={() => handleRemove(index)}
													>
														<Trash2 />
													</Button>
												</div>
											))}
											<Button
												size='icon'
												variant='secondary'
												type='button'
												className='self-end'
												onClick={() =>
													setParams(prev => [...prev, { key: '', value: '' }])
												}
											>
												<Plus />
											</Button>
										</div>
									</ScrollArea>

									<DialogFooter className='mt-5'>
										<Button type='submit'>Сохранить</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				</CardHeader>
				<CardContent>
					<p>Таблица</p>
				</CardContent>
			</Card>
		</div>
	)
}
