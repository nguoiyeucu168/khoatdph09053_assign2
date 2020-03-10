import React, {useState,useEffect } from 'react';
import { StyleSheet, Text, View, Switch, Button, TextInput, Modal, FlatList, Image } from 'react-native';
import TaleItem from './list/item';
export default function App() {
    const API = 'http://5e674b5f1937020016fed8d7.mockapi.io/api/tales';
    const handleEdit = (id, setIndex) => {
        setShowEditModal(setIndex);
        fetchDetailItem(id, false);

    };
    const fetchDetailItem = (id,setDetail) => {
        return fetch(
            API + "/" + id
        ).then((response) => response.json())
            .then((responseJson) => (handleDetail(responseJson, setDetail)))
            .catch((error)=> console.error(error))
};
    const fetchTales = () => {
        return fetch(API, {}).then((response) => response.json()).then((responeJson) => { setTalesChange(responeJson) }).catch((error) => console.log(error));
    };
    useEffect(
        () => { fetchTales(); }, []);
    const UseEffect = () => {
        useEffect(
            () => { fetchTales(); }, []);
    }
   
    const IsFull = (isFull) => {

        var trangthai = '';
        if (isFull == true) {
            trangthai = 'Đầy đủ'
        }
        else {
            trangthai = 'Đang cập nhật'
        }
        return (trangthai);
    }
    const tale = [
        {
            id: 1,
            avatar: 'https://lh3.googleusercontent.com/proxy/2JbuQA-Iw4vNThuC5ys-KkcP2piUW0rvuimViP9k_NvwoACKh3uE8_xGbxDDg1gl-te6FLEhKcBq6JNcS1tNhQEu4OgbNfI',
            name: 'Sherlock Home: Hình nhân biết múa',
            category: 'Trinh thám',
            total_chapter: 136,
            is_full: true,
        },
        {
            id: 2,
            avatar: 'https://static.8cache.com/cover/o/eJzLyTDR180LKc8Kjw9w9kly1Q9z8nUxyTQ3Ms721HeEgmxvC_3MsEKLgJLCxIqIcv1yI0NT3QxjIyMAUTMSjA==/dau-la-dai-luc.jpg',
            name: 'Đấu La Đại Lục',
            category: 'Huyền Huyễn',
            total_chapter: 560,
            is_full: true,
        },
        {
            id: 3,
            avatar: 'https://static.8cache.com/cover/o/eJzLyTDT17WITwqMNNQtNKp01A_zNXY1ifQuc8301HeEghwTR_1IV8PsTO-w4HKTUP1iAwC-dBAE/pham-nhan-tu-tien.jpg',
            name: 'Phàm Nhân Tu Tiên',
            category: 'Tiên Hiệp',
            total_chapter: 1230,
            is_full: false,
        },
        {
            id: 4,
            avatar: 'https://www.thegioidienanh.vn/stores/news_dataimages/hath/092017/01/17/4505_chu_thich_2.jpg',
            name: 'Hoa Thiên Cốt',
            category: 'Huyền Huyễn',
            total_chapter: 600,
            is_full: false,
        }
    ]
    const [tales, setTalesChange] = React.useState(tale);
    const handleDelete = (id) => {
        fetch(`${API}/${id}`, { method: 'DELETE' }).then(() => fetchTales()).catch((error) => console.log(error));
    }
    const handleEditSubmit = () => {
        
        const tale_edit_item = {
            id: taleId,
            avatar: taleAvaLink,
            name: taleName,
            category: taleCategory,
            total_chapter: taleTotalChapter,
            is_full: taleStatus,
        };
        const updatecommand = `${API}/${tale_edit_item.id}`;
        fetch(updatecommand, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(tale_edit_item)
        }).then((respone) => respone.json()).then((responeJson) => {
            const newTale = tale_edit_item.push(responeJson);
            setTalesChange(newTale);
            });
        fetchTales();
        setShowEditModal(false);
        refresh();
      
    }

    const handleAddSubmit = () => {
        
        const tale_item = {
            avatar: taleAvaLink,
            name: taleName,
            category: taleCategory,
            total_chapter: taleTotalChapter,
            is_full: taleStatus,
        };
        fetch(API, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(tale_item)
        }).then((respone) => respone.json()).then((responeJson) => {
            const newTale = tale_item.push(responeJson);
            setTalesChange(newTale);
            });
        refresh();
        setShowAddModal(false);
        fetchTales();
     
    }
    const refresh = () => {
        onChangeTaleCategory('');
        onChangeTaleAvaLink('');
        onChangeTaleName('');
        onChangeTaleStatus(false);
        onChangeTaleTotalChapter('');
    };
    const setCurrentTales = (item) => {
        onChangeTaleId(item.id);
        onChangeTaleAvaLink(item.avatar);
        onChangeTaleName(item.name);
        var totalchap = item.total_chapter;
        onChangeTaleCategory(item.category);
        onChangeTaleTotalChapter(`${totalchap}`);
        onChangeTaleStatus(item.is_full);
    }
    const [indexItem, onChangindexItem] = React.useState(tale[0]);
    const [name, onChangeName] = React.useState('');
    const [taleId, onChangeTaleId] = React.useState('');
    const [taleCategory, onChangeTaleCategory] = React.useState('');
    const [taleTotalChapter, onChangeTaleTotalChapter] = React.useState('');
    const [taleName, onChangeTaleName] = React.useState('');
    const [taleAvaLink, onChangeTaleAvaLink] = React.useState('');
    const [taleStatus, onChangeTaleStatus] = React.useState(false);
    const [age, onChangeAge] = React.useState('');
    var enablebutton = true;
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [showModal, setShowModal] = React.useState(true);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const handleDetail = (indexItem, setDetail) => {
        setShowDetailModal(setDetail);
        setCurrentTales(indexItem);
    }
    const setEnableButton = () => {
        if (!name.trim() == '' && age>=18) {
            enablebutton = false;
        }
        else {
            enablebutton = true;
        }
    }
    return (
        
        <View style={styles.container}>
            <View style={styles.container}>
                <Text><Text style={{ fontWeight: 'bold' }}>Tên người dùng:</Text> {name}</Text>
                <Button title='ADD' onPress={() => { setShowAddModal(true) }} />
                <Button title='Cancel' onPress={() => {
                    setShowModal(true);
                }} />
                <FlatList 
                    data={tales}
                    renderItem={({ item }) => (
                        <TaleItem item={item} handleDelete={handleDelete} fetchDetailItem={fetchDetailItem} handleEdit={handleEdit} />
                    )}
                    keyExtractor={(item, index) => index}
                />

            </View>
            <Modal visible={showEditModal}>
                <View style={styles.container} >
                    <Text style={styles.title}>Update truyện</Text>
                    <Text >Link ảnh</Text>
                    <TextInput style={styles.input}
                        value={taleAvaLink} onChangeText={(value) => onChangeTaleAvaLink(value)}
                    />
                    <Text >Tên truyện</Text>
                    <TextInput style={styles.input}
                        value={taleName} onChangeText={(value) => onChangeTaleName(value)}
                    />
                    <Text >Thể Loại</Text>
                    <TextInput style={styles.input}
                        value={taleCategory} onChangeText={(value) => onChangeTaleCategory(value)}
                    />
                    <Text >Số Chương</Text>
                    <TextInput style={styles.input} keyboardType={'numeric'}
                        value={taleTotalChapter} onChangeText={(value) => onChangeTaleTotalChapter(value)}
                    />
                    <Text >Tình trạng: {IsFull(taleStatus)}</Text>
                    <Switch value={taleStatus} onValueChange={() => { onChangeTaleStatus(!taleStatus) }} /> 
                    <Button title='SUBMIT' onPress={() => {
                        handleEditSubmit();


                    }} />
                    <Button title='CANCEL' onPress={() => { setShowEditModal(false); refresh(); }} />
                </View >
            </Modal>
            <Modal visible={showAddModal}>
                <View style={styles.container} >
                    <Text style={styles.title}>Thêm truyện</Text>
                    <Text >Link ảnh</Text>
                    <TextInput style={styles.input}
                        value={taleAvaLink} onChangeText={(value) => onChangeTaleAvaLink(value)}
                    />
                    <Text >Tên truyện</Text>
                    <TextInput style={styles.input}
                        value={taleName} onChangeText={(value) => onChangeTaleName(value)}
                    />
                    <Text >Thể Loại</Text>
                    <TextInput style={styles.input}
                        value={taleCategory} onChangeText={(value) => onChangeTaleCategory(value)}
                    />
                    <Text >Số Chương</Text>
                    <TextInput style={styles.input} keyboardType={'numeric'}
                        value={taleTotalChapter} onChangeText={(value) => onChangeTaleTotalChapter(value)}
                    />
                    <Text >Tình trạng: {IsFull(taleStatus)}</Text>
                    <Switch value={taleStatus} onValueChange={() => { onChangeTaleStatus(!taleStatus) }} /> 
                    <Button title='SUBMIT' onPress={() => {
                        handleAddSubmit();
                        

                    }} />
                    <Button title='CANCEL' onPress={() => { setShowAddModal(false); refresh(); }} />
                </View >
            </Modal>
            <Modal visible={showModal}>
                <View style={styles.container} >
                    <Text style={styles.title}>Nhập tên của bạn</Text>
                    <TextInput style={styles.input} 
                        value={name} onChangeText={(value) => onChangeName(value)} onSubmitEditing={setEnableButton()}
                    />

                    <Text style={styles.title}>Nhập tuổi của bạn</Text>
                    <TextInput 
                        style={styles.input}
                        value={age} onChangeText={(value) => onChangeAge(value)} underlineColorAndroid='transparent' keyboardType={'numeric'}


                    />
                    <Button  title='Vào đọc truyện' disabled={enablebutton} onPress={() => {
                        setShowModal(false);
                    }} />
                </View >
            </Modal>
            <Modal visible={showDetailModal}>
                <View style={styles.container}>
                    <Image style={{ width: 200, height: 200, marginBottom: 10, borderRadius: 20 }} source={{ uri: taleAvaLink }} />
                 
                    <View>
                        <Text ><Text style={styles.textTile} >Tên Truyện:</Text> {taleName}</Text>
                        <Text ><Text style={styles.textTile} >Thể Loại:</Text> {taleCategory}</Text>
                        <Text ><Text style={styles.textTile} >Số chương:</Text> {taleTotalChapter}</Text>
                        <Text ><Text style={styles.textTile} >Trạng thái:</Text> {IsFull(taleStatus)}</Text>
                    </View>
                    <Button title='Cancel' onPress={() => { setShowDetailModal(false) }} />
                </View>
            </Modal>
        </View>

  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTile: {
        fontSize: 19,
        color: 'red',
        fontWeight: 'bold'
    },
    input: {
        height: 40, width: 200, textAlign: 'center',
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 60,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold'
    }

});
