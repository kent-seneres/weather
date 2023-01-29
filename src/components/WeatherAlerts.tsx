import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {Text, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import {Alert} from '../core/types';

export interface WeatherAlertsProps {
  data: Alert[];
}

const formatDescription = (description: string): string => {
  // trim out scattered newlines, but keep the double new lines separating paragraphs
  return description
    .split('\n\n')
    .map((s) => s.replace(/\n/g, ' '))
    .join('\n\n')
    .replace(/\* /g, '\n\n');
};

const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

const Part: React.FC<{title: string; body: string}> = (props) => {
  return (
    <View style={{marginBottom: 8}}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.title}</Text>
      <Text style={{fontSize: 14}}>{props.body}</Text>
    </View>
  );
};

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({data}) => {
  if (data.length === 0) {
    return null;
  }

  const mainTitle = data[0].event;
  const extras = data.length > 1 ? ` | +${data.length - 1}` : '';
  const buttonTitle = `${mainTitle}${extras}`;

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const renderAlertContent = (alert: Alert) => {
    return (
      <View>
        <Text style={styles.modalTitle}>{alert.event}</Text>
        <View style={styles.descriptionContainer}>
          <Part title="Effective Until" body={formatTime(alert.end)} />
          <Part title="Issued By" body={alert.sender_name} />
          <Part
            title="Description"
            body={formatDescription(alert.description)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Swiper loop={false}>
              {data.map((alertGroup) => {
                return (
                  <ScrollView
                    style={styles.alertContent}
                    key={alertGroup.event}>
                    {renderAlertContent(alertGroup)}
                  </ScrollView>
                );
              })}
            </Swiper>
            <View style={styles.divider} />
            <Button
              title="Dismiss"
              containerStyle={styles.dismissButtonContainer}
              buttonStyle={styles.dismissButton}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.touchableContainer}>
        <Icon size={16} name="alert-circle" style={styles.icon} />
        <Text style={styles.titleText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    alignSelf: 'center',
    alignItems: 'center',
  },
  touchableContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderColor: '#ff8c00',
    borderRadius: 12,
    borderWidth: 1,
  },
  icon: {
    color: '#ff8c00',
    marginStart: 6,
  },
  titleText: {
    marginHorizontal: 6,
    color: '#ff8c00',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    height: '75%',
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 16,
    color: '#ff8c00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertContent: {},
  descriptionContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
  },
  timestamp: {
    textAlign: 'left',
  },
  description: {
    paddingTop: 16,
    textAlign: 'left',
  },
  dismissButtonContainer: {
    marginVertical: 16,
    alignSelf: 'center',
  },
  dismissButton: {
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  divider: {
    height: 2,
    marginHorizontal: 16,
    backgroundColor: '#f3f0f6',
  },
});
