import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button} from "react-bootstrap"
import axios from "axios";
export function FormTranzactionDeleteProductAmountAndHistoryOfSelling(){
    const {register, handleSubmit} = useForm()
    const [arrayOptionsSort, setArrayOptionsSort] = useState(['-'])
    const [arrayOptionsProduct, setArrayOptionsProduct] = useState(['-'])
    let text1 = "Выберите продукцию"
    const [textWarningSelect, setTextWarningSelect] = useState()
    function submit(data){
            if(data.name !== '-'){
                setTextWarningSelect()
                axios.post('http://localhost:8100/admin/tranzactionDeleteHistoryOfSelling', data)
            } else setTextWarningSelect(text1)
    }
    function loadOptions(event){
        axios.post('http://localhost:8100/admin/getTableSorts')
            .then(res => {
                if (res.data){
                    let arrayNames = [];
                    for(let i = 0; i < res.data.length; i++){
                        arrayNames[i] = res.data[i].name
                    }
                    setArrayOptionsSort(arrayNames)
                }
            })
        const request = {
            name: event.target.value
        }
        axios.post('http://localhost:8100/admin/getTableProductsBySort', request)
            .then(res => {
                if (res.data){
                    let arrayNames = [];
                    for(let i = 0; i < res.data.length; i++){
                        arrayNames[i] = res.data[i].name
                    }
                    setArrayOptionsProduct(arrayNames)
                }
            })
    }
    return <Form onSubmit={handleSubmit(submit)}>
        <Form.Group>
            <Form.Select
                style={{border: '0px', backgroundColor: 'white',
                    margin: '3px', marginLeft:'9px'}}
                onClick={loadOptions}>
                {arrayOptionsSort.map((option) => <option>{option}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Select
                style={{border: '0px', backgroundColor: 'white',
                    margin: '3px', marginLeft:'9px'}}
                {...register('name')}>
                {arrayOptionsProduct.map((option) => <option>{option}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Control
                type="text"
                placeholder="Количество"
                {...register('amount')} />
            <Form.Label>
                {textWarningSelect}
            </Form.Label>
        </Form.Group>
        <Button variant="light" type="submit">
            Вернуть товар на склад
        </Button>
    </Form>;
}