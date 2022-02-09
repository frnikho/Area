FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY . /app

# Install dependencies

RUN npm install --force

WORKDIR /app/android/

# Clean android folder

RUN ./gradlew clean

WORKDIR /app

RUN npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

WORKDIR /app/android/

# Remove duplications

RUN rm -rf app/src/main/res/drawable-*

# Generate APK

CMD ["./gradlew", "assembleRelease"]
