using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using RelatedPages.Util;
using System.Data;

namespace RelatedPages.Models
{
    public class DBCon
    {
        public List<Dictionary<string, Object>> ExecuteSelect(string sql, Dictionary<string, object[]> dicParams = null)
        {
            using (var connection = new SqlConnection(PrivateConsts.CONNECTION_STRING))
            using (var command = new SqlCommand(sql, connection))
            {
                try
                {
                    // パラーメータの置換
                    if (dicParams != null)
                    {
                        foreach (KeyValuePair<string, object[]> kvp in dicParams)
                        {
                            var param = command.CreateParameter();
                            param.ParameterName = kvp.Key;
                            param.SqlDbType = (SqlDbType)kvp.Value[0];
                            param.Direction = ParameterDirection.Input;
                            param.Value = kvp.Value[1];

                            command.Parameters.Add(param);
                        }
                    }

                    // データベースの接続開始
                    connection.Open();

                    // SQLの実行
                    SqlDataReader sdr = command.ExecuteReader();

                    var records = new List<Dictionary<string, Object>>();

                    while (sdr.Read() == true)
                    {
                        var record = new Dictionary<string, Object>();
                        for (int i = 0; i < sdr.FieldCount; i++)
                        {
                            var value = sdr.GetValue(i);
                            record.Add(sdr.GetName(i), DBNull.Value.Equals(value) ? null : value);
                        }
                        records.Add(record);
                    }
                    return records;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                    throw;
                }
                finally
                {
                    // データベースの接続終了
                    connection.Close();
                }
            }
        }

        public bool ExecuteUpdate(string sql, Dictionary<string, object[]> dicParams)
        {
            using (var connection = new SqlConnection(PrivateConsts.CONNECTION_STRING))
            using (var command = new SqlCommand("SET ANSI_WARNINGS OFF; " + sql, connection))
            {
                try
                {
                    // パラーメータの置換
                    if (dicParams != null)
                    {
                        foreach (KeyValuePair<string, object[]> kvp in dicParams)
                        {
                            var param = command.CreateParameter();
                            param.ParameterName = kvp.Key;
                            param.SqlDbType = (SqlDbType)kvp.Value[0];
                            param.Direction = ParameterDirection.Input;
                            param.Value = kvp.Value[1];

                            command.Parameters.Add(param);
                        }
                    }

                    // データベースの接続開始
                    connection.Open();

                    // SQLの実行
                    int result = command.ExecuteNonQuery();
                    return result >= 0;
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                    throw;
                }
                finally
                {
                    // データベースの接続終了
                    connection.Close();
                }
            }
        }
    }
}
