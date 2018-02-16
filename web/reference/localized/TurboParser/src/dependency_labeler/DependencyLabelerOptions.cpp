// Copyright (c) 2012-2015 Andre Martins
// All Rights Reserved.
//
// This file is part of TurboParser 2.3.
//
// TurboParser 2.3 is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// TurboParser 2.3 is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with TurboParser 2.3.  If not, see <http://www.gnu.org/licenses/>.

#include "DependencyLabelerOptions.h"
#include "StringUtils.h"
#include "SerializationUtils.h"
#include <glog/logging.h>

// TODO: Implement the text format.
DEFINE_string(file_format, "conll",
              "Format of the input file containing the data. Use ""conll"" for "
              "the format used in CONLL-X, and ""text"" for tokenized sentences"
              "(one per line, with tokens separated by white-spaces.");
DEFINE_bool(prune_labels, true,
            "True for pruning the set of possible labels taking into account "
            "the labels that have occured for each pair of POS tags in the "
            "training data.");
DEFINE_bool(use_sibling_parts, true,
            "True for using sibling parts.");

// Save current option flags to the model file.
void DependencyLabelerOptions::Save(FILE* fs) {
  Options::Save(fs);

  bool success;
  //success = WriteString(fs, model_type_);
  //CHECK(success);
  //success = WriteBool(fs, projective_);
  //CHECK(success);
  success = WriteBool(fs, prune_labels_);
  CHECK(success);
  success = WriteBool(fs, use_sibling_parts_);
  CHECK(success);
}

// Load current option flags to the model file.
// Note: this will override the user-specified flags.
void DependencyLabelerOptions::Load(FILE* fs) {
  Options::Load(fs);

  bool success;
  //success = ReadString(fs, &FLAGS_model_type);
  //CHECK(success);
  //LOG(INFO) << "Setting --model_type=" << FLAGS_model_type;
  //success = ReadBool(fs, &FLAGS_projective);
  //CHECK(success);
  //LOG(INFO) << "Setting --projective=" << FLAGS_projective;
  success = ReadBool(fs, &FLAGS_prune_labels);
  CHECK(success);
  LOG(INFO) << "Setting --prune_labels=" << FLAGS_prune_labels;
  success = ReadBool(fs, &FLAGS_use_sibling_parts);
  CHECK(success);
  LOG(INFO) << "Setting --use_sibling_parts=" << FLAGS_use_sibling_parts;

  Initialize();
}

void DependencyLabelerOptions::Initialize() {
  Options::Initialize();

  file_format_ = FLAGS_file_format;
  //model_type_ = FLAGS_model_type;
  //projective_ = FLAGS_projective;
  prune_labels_ = FLAGS_prune_labels;
  use_sibling_parts_ = FLAGS_use_sibling_parts;
}
