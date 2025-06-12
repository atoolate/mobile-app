import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { OPENAI_API_KEY, API_URL, BEARER_TOKEN } from '@env';
import CustomHeader from '../components/CustomHeader';

export default function ChatBot({ navigation }) {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        "You are a helpful customer service agent at a tech store called Deskly. Answer questions about products, availability, and recommendations. Be friendly and concise.",
    },
    { role: 'assistant', content: 'Hi! Ask me anything about your desk setup or our products.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();
  const [productSummary, setProductSummary] = useState('');

  const fetchProducts = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.items.map(item => ({
    name: item.product.fieldData.name,
    description: item.product.fieldData.description,
    category: item.product.fieldData.category[0],
    price: item.skus[0]?.fieldData.price.value / 100,
  }));
};

const formatProductsForPrompt = (products) => {
  return products.slice(0, 5).map(p => 
    `- ${p.name} (€${p.price}): ${p.description}`
  ).join('\n');
};


  const sendMessage = async () => {
    if (!input) return;

    // Fetch products and format for prompt
    const products = await fetchProducts();
    const productSummary = formatProductsForPrompt(products);

    // Compose system prompt with product info
    const systemPrompt = `
      You are a helpful customer service agent at a tech store called Deskly.
      \nYou answer questions about products, availability, and recommendations.
      \nHere are some products in the store:\n${productSummary}
      \nWhen the user asks for a recommendation, base your suggestions on these products.
      \nIf the user asks about a specific product, provide details based on the product list.
      \nBe friendly and concise.`;

    // Always keep the system prompt as the first message
    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.filter(m => m.role !== 'system'),
      { role: 'user', content: input }
    ];

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: chatMessages,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
      setMessages([
        ...messages,
        { role: 'user', content: input },
        { role: 'assistant', content: reply }
      ]);
    } catch (e) {
      setMessages([
        ...messages,
        { role: 'user', content: input },
        { role: 'assistant', content: "Sorry, something went wrong." }
      ]);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <View style={styles.outerContainer}>
        <CustomHeader title="Chatbot" navigation={navigation} />
        <View style={styles.container}>
          <ScrollView
            style={styles.chatBox}
            contentContainerStyle={{ paddingVertical: 10 }}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps="handled"
          >
            {messages
              .filter(msg => msg.role !== 'system')
              .map((msg, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.messageRow,
                    msg.role === 'user' ? styles.userRow : styles.assistantRow,
                  ]}
                >
                  <Text style={msg.role === 'user' ? styles.userMsg : styles.assistantMsg}>
                    {msg.content}
                  </Text>
                </View>
              ))}
          </ScrollView>
          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask about chairs, desks, or setups..."
              style={styles.input}
              editable={!loading}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendButton, loading && { backgroundColor: '#ccc' }]}
              onPress={sendMessage}
              disabled={loading}
            >
              <Text style={styles.sendButtonText}>{loading ? '...' : 'Send'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  chatBox: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 2,
    paddingHorizontal: 15,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  userMsg: {
    color: '#fff',
    backgroundColor: '#007aff',
    fontFamily: 'VarelaRound_400Regular',
    fontSize: 16,
    padding: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  assistantMsg: {
    color: '#222',
    backgroundColor: '#f0f0f0',
    fontFamily: 'VarelaRound_400Regular',
    fontSize: 16,
    padding: 10,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
   inputRow: {
    flexDirection: 'row',
    padding:10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    gap: 10, // optional: adds spacing between input and button
  },
  input: {
    flex: 1,
    height: 44, // fixed height for consistency
    borderWidth: 1,
    borderColor: '#1a1a1a',
    borderRadius: 0,
    fontFamily: 'VarelaRound_400Regular',
    fontSize: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007aff',
    height: 44, // match input height
    paddingHorizontal: 22,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  sendButtonText: {
    color: '#fff',
    fontFamily: 'Inconsolata_700Bold',
    fontSize: 16,
  },
});