'use strict';

import React from 'react';
import ReactNative, {StyleSheet, Dimensions} from 'react-native';

export function Text({style, ...props}: Object): ReactElement {
  let normalizedFontSize = null;
  if (style != null) {
    normalizedFontSize = (style.fontSize != null) ? normalize(style.fontSize) : null;
    if (style.fontSize) {
      delete style.fontSize;
    }
  }
  return <ReactNative.Text style={[styles.font, style, {fontSize: normalizedFontSize}]} {...props} />;
}

export function Heading1({style, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, styles.h1, style]} {...props} />;
}

export function Paragraph({style, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.font, styles.p, style]} {...props} />;
}

export function Logo({style, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.logo, style]} {...props} />;
}

export function Title({style, ...props}: Object): ReactElement {
  return <ReactNative.Text style={[styles.title, style]} {...props} />;
}

const scale = Dimensions.get('window').width / 375;

function normalize(size: number): number {
  return Math.round(scale * size);
}

const styles = StyleSheet.create({
  font: {

  },
  h1: {
    fontSize: normalize(24),
    lineHeight: normalize(27),
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  p: {
    fontSize: normalize(15),
    lineHeight: normalize(23),
  },
  logo: {
    fontSize: normalize(63),

  },
  title: {
    fontSize: normalize(18),
    fontWeight:'600'
  }
});
