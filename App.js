import { SUPABASE_URL, SUPABASE_KEY } from 'react-native-dotenv'

import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import ItemButton from './components/itemButton';
import 'react-native-url-polyfill/auto';

import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

import { createClient } from '@supabase/supabase-js';


// initialize supabase
const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

const client = createClient(supabaseUrl, supabaseKey);

export default function App() {

  const [data, setData] = useState(null);

  // get data from subabase Items Table
  const fetchData = async () => {
    const { data: items, error } = await client
      .from('Items')
      .select('*')
      .order('id', { ascending: true });
    if (error) {
      console.log(error);
    } else {
      console.log('Data Fetched');
      setData(items);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const insertData = async (name) => {
    const { data, error } = await client
      .from('Items')
      .insert({ name })
      .single();
    if (error) {
      console.log(error);
    } else {
      console.log('Item Added');
      fetchData();
    }
  };

  const removeData = async (id) => {
    const { data, error } = await client
      .from('Items')
      .delete()
      .eq('id', id);
    if (error) {
      console.log(error);
    } else {
      console.log('Item Deleted');
      fetchData();
    }
  };

  const addButton = () => {
    insertData(text);
    onChangeText('');
  }

  const deleteItem = (id) => {
    removeData(id)
  }
  const [text, onChangeText] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor='#2DD600' />
        <View>
          <TouchableOpacity style={styles.refreshButton} onPress={fetchData}>
            <Text style={{ color: 'white' }}>Refresh</Text>
            <MaterialIcons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="New Item"
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <View style={styles.addButtonWrapper}>
            <ItemButton type="add" style={styles.addButton} text="Add" onPress={addButton} />
          </View>
        </View>

        {/* Generate items */}
        <View style={styles.itemsWrapper}>
          {data && data.map((item) => {
            return (
              <View key={item.id} style={styles.item}>
                <ItemButton text={item.name} onPress={() => { deleteItem(item.id) }} />
              </View>
            )
          })}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  refreshButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#2DD600',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 100,
  },
  input: {
    paddingHorizontal: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderTopLeftRadius: 500,
    borderBottomLeftRadius: 500,
    borderRightWidth: 0,
    height: 60
  },
  addButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  addButton: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    borderTopRightRadius: 500,
    borderBottomRightRadius: 500,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingRight: 15,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 15,
    marginTop: 30,
  },
  item: {
    flexGrow: 1,
  }
});
