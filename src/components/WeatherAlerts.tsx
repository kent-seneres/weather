import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import {Text, Button} from 'react-native-elements';
import {AlertsData, WeatherAlertGroup} from '../core/types';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';

export interface WeatherAlertsProps {
  data: AlertsData;
}

const trimTitle = (fullTitle: string): string => {
  return fullTitle.substr(0, fullTitle.indexOf('issued')).trim();
};

const formatDescription = (description: string): string => {
  // trim out scattered newlines, but keep the double new lines separating paragraphs
  return description
    .split('\n\n')
    .map((s) => s.replace(/\n/g, ' '))
    .join('\n\n');
};

const formatTime = (timestamp: string | number): string => {
  return new Date(timestamp).toLocaleString();
};

export const WeatherAlerts: React.FC<WeatherAlertsProps> = ({data}) => {
  const mainTitle = trimTitle(data.alerts[0].title);
  const extras = data.alerts.length > 1 ? ` | +${data.alerts.length - 1}` : '';
  const buttonTitle = `${mainTitle}${extras}`;

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const renderAlertContent = (alert: WeatherAlertGroup) => {
    return (
      <>
        <Text style={styles.modalTitle}>{trimTitle(alert.title)}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.timestamp}>
            Effective: {formatTime(alert.effective_utc)}
          </Text>
          <Text style={styles.timestamp}>
            Effective: {formatTime(alert.expires_utc)}
          </Text>
          <Text style={styles.description}>
            {formatDescription(alert.description)}
          </Text>
        </View>
      </>
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
              {data.alerts.map((alertGroup) => {
                return (
                  <ScrollView
                    style={styles.alertContent}
                    key={alertGroup.title}>
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
  alertContent: {
    marginBottom: 52,
  },
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
